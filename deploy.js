#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 JasyAI Auto Deployment');
console.log('=========================');

// Check if wrangler is logged in
try {
  execSync('wrangler whoami', { stdio: 'pipe' });
} catch (error) {
  console.log('🔐 Please login to Cloudflare first:');
  execSync('wrangler auth login', { stdio: 'inherit' });
}

// Create KV namespace for production
console.log('📦 Creating KV namespace...');
try {
  const output = execSync('wrangler kv:namespace create "JASYSAI_KV" --preview false', { encoding: 'utf8' });
  const kvIdMatch = output.match(/"([^"]+)"/);
  const kvId = kvIdMatch ? kvIdMatch[1] : null;

  if (!kvId) {
    throw new Error('Failed to extract KV ID from output');
  }

  console.log(`✅ KV Namespace created with ID: ${kvId}`);

  // Update wrangler.toml with the KV ID
  let wranglerToml = fs.readFileSync('wrangler.toml', 'utf8');
  wranglerToml = wranglerToml.replace(/id = "jasysai-kv"/, `id = "${kvId}"`);
  fs.writeFileSync('wrangler.toml', wranglerToml);

  console.log('📝 Updated wrangler.toml with KV binding');

  // Deploy the worker
  console.log('🚀 Deploying worker...');
  execSync('wrangler deploy', { stdio: 'inherit' });

  console.log('🎉 Deployment successful!');
  console.log('🌐 Your app is now live at: https://ai.jasyscom.workers.dev');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}