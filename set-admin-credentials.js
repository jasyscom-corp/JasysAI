import { ConfigService } from './src/config/config.service.js';
import { DB } from './src/db/database.js';

// Get KV namespace from environment variables
const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, KV_NAMESPACE_ID } = process.env;

async function setInitialAdminCredentials() {
  if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN || !KV_NAMESPACE_ID) {
    console.error('Please set the following environment variables:');
    console.error('CLOUDFLARE_ACCOUNT_ID');
    console.error('CLOUDFLARE_API_TOKEN');
    console.error('KV_NAMESPACE_ID');
    process.exit(1);
  }

  try {
    // Mock environment for Cloudflare Workers
    const env = {
      JASYSAI_KV: {
        get: async (key) => {
          console.log(`Getting key from KV: ${key}`);
          const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${key}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
            }
          });

          if (response.status === 404) {
            return null;
          }

          if (!response.ok) {
            throw new Error(`Failed to get key from KV: ${response.status} ${response.statusText}`);
          }

          const value = await response.text();
          return value ? JSON.parse(value) : null;
        },
        put: async (key, value) => {
          console.log(`Putting key in KV: ${key}`);
          console.log(`Value:`, value);
          const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${key}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to put key in KV: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
          }

          return true;
        },
        delete: async (key) => {
          console.log(`Deleting key from KV: ${key}`);
          const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${key}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to delete key from KV: ${response.status} ${response.statusText}`);
          }

          return true;
        }
      }
    };

    // Set initial admin credentials
    const result = await ConfigService.setAdminCredentials(env, 'admin', 'admin123');
    
    if (result) {
      console.log('Admin credentials set successfully');
      
      // Verify the credentials are set
      const adminUser = await ConfigService.getAdminUser(env);
      const adminPass = await ConfigService.getAdminPass(env);
      
      console.log(`Admin user: ${adminUser}`);
      console.log(`Admin pass: ${adminPass}`);
    } else {
      console.error('Failed to set admin credentials');
    }
  } catch (error) {
    console.error('Error setting admin credentials:', error);
    process.exit(1);
  }
}

setInitialAdminCredentials();
