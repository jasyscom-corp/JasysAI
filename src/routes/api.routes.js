import { DB } from '../db/index.js';
import { handleBilling } from '../db/database.js';
import { UserController } from '../dashboard/users/user.controller.js';
import { CONFIG } from '../config/index.js';

export async function apiRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Get authorization header
  const authHeader = request.headers.get('Authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  
  if (!token) {
    return new Response(JSON.stringify({ err: 'Unauthorized' }), { status: 401 });
  }

  const sess = await DB.get(env, `sess:${token}`);
  if (!sess) {
    return new Response(JSON.stringify({ err: 'Invalid token' }), { status: 401 });
  }

  // User API routes
  if (path.startsWith('/api/user/')) {
    if (sess.role !== 'user') {
      return new Response(JSON.stringify({ err: 'Forbidden' }), { status: 403 });
    }

    // Get chat history
    if (path === '/api/user/history' && method === 'GET') {
      const history = await UserController.getChatHistory(env, sess.email);
      return new Response(JSON.stringify(history), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create API key
    if (path === '/api/user/keys' && method === 'POST') {
      const { name } = await request.json();
      const result = await UserController.createApiKey(env, sess.email, name);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete API key
    if (path === '/api/user/keys' && method === 'DELETE') {
      const { key } = await request.json();
      const result = await UserController.deleteApiKey(env, sess.email, key);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Purchase package
    if (path === '/api/user/package/purchase' && method === 'POST') {
      const { packageId } = await request.json();
      const result = await UserController.purchasePackage(env, sess.email, packageId);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update account
    if (path === '/api/user/account/update' && method === 'POST') {
      const updates = await request.json();
      const result = await UserController.updateAccount(env, sess.email, updates);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get usage stats
    if (path === '/api/user/stats' && method === 'GET') {
      const stats = await UserController.getUsageStats(env, sess.email);
      return new Response(JSON.stringify(stats), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Chat API
  if (path === '/api/chat' && method === 'POST') {
    const { message, chatId } = await request.json();
    const user = await DB.get(env, `u:${sess.email}`);
    
    if (!user) {
      return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
    }

    try {
      // Get API configuration
      const settings = await DB.get(env, 'sys_settings') || {};
      const proxyApiKey = settings.proxy_api_key || 'your-proxy-api-key';
      
      if (!proxyApiKey) {
        return new Response(JSON.stringify({ err: 'Proxy API key not configured' }), { status: 500 });
      }

      // Call ai-proxy API
      const response = await fetch('https://ai-proxy.jasyscom-corp.workers.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${proxyApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }]
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Proxy API error:', response.status, errorData);
        throw new Error(`Proxy API error: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      // Save chat history
      const chatHistory = await DB.get(env, `chat:${sess.email}`) || [];
      const chatIndex = chatHistory.findIndex(c => c.id === chatId);
      
      const newMessage = {
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      };
      
      const aiMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      };

      if (chatIndex >= 0) {
        chatHistory[chatIndex].messages.push(newMessage, aiMessage);
      } else {
        chatHistory.push({
          id: chatId,
          title: message.substring(0, 50) + '...',
          created: new Date().toISOString(),
          messages: [newMessage, aiMessage]
        });
      }

      await DB.set(env, `chat:${sess.email}`, chatHistory);

      // Handle billing (simplified - in real implementation, calculate actual tokens)
      const mockUsage = {
        prompt_tokens: message.length,
        completion_tokens: aiResponse.length
      };
      await handleBilling(env, sess.email, 'openai/gpt-3.5-turbo', mockUsage);

      return new Response(JSON.stringify({ ok: true, response: aiResponse }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Chat API error:', error);
      return new Response(JSON.stringify({ 
        err: 'Failed to process chat',
        details: error.message 
      }), { status: 500 });
    }
  }

  // OpenAI-compatible API
  if (path === '/v1/chat/completions' && method === 'POST') {
    const body = await request.json();
    const apiKey = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!apiKey) {
      return new Response(JSON.stringify({ err: 'API key required' }), { status: 401 });
    }

    // Find user by API key
    const users = await DB.list(env, 'u:');
    let user = null;
    let userEmail = null;

    for (const userKey of users.keys) {
      const userData = await DB.get(env, userKey.name);
      if (userData && userData.api_keys) {
        const keyFound = userData.api_keys.find(k => k.key === apiKey);
        if (keyFound) {
          user = userData;
          userEmail = userKey.name.replace('u:', '');
          break;
        }
      }
    }

    if (!user) {
      return new Response(JSON.stringify({ err: 'Invalid API key' }), { status: 401 });
    }

    try {
      // Get API configuration
      const settings = await DB.get(env, 'sys_settings') || {};
      const proxyApiKey = settings.proxy_api_key || 'your-proxy-api-key';
      
      if (!proxyApiKey) {
        return new Response(JSON.stringify({ err: 'Service unavailable' }), { status: 503 });
      }

      // Forward request to ai-proxy.jasyscom-corp.workers.dev
      const response = await fetch('https://ai-proxy.jasyscom-corp.workers.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${proxyApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Proxy API error:', response.status, errorData);
        throw new Error(`Proxy API error: ${response.status}`);
      }

      const data = await response.json();

      // Handle billing
      if (data.usage) {
        await handleBilling(env, userEmail, body.model, data.usage);
      }

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('OpenAI-compatible API error:', error);
      return new Response(JSON.stringify({ 
        err: 'Service unavailable',
        details: error.message 
      }), { status: 503 });
    }
  }

  return new Response('Not Found', { status: 404 });
}