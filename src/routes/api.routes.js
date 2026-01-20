import { DB } from '../db/index.js';
import { handleBilling } from '../db/database.js';
import { UserController } from '../dashboard/users/user.controller.js';
import { ConfigService } from '../config/config.service.js';

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

    // Purchase credits
    if (path === '/api/user/credits/purchase' && method === 'POST') {
      const { packageId } = await request.json();
      const result = await UserController.purchaseCredits(env, sess.email, packageId);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Subscribe to plan
    if (path === '/api/user/subscribe' && method === 'POST') {
      const { planId } = await request.json();
      const result = await UserController.subscribePlan(env, sess.email, planId);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Team management
    if (path === '/api/user/team/create' && method === 'POST') {
      const { name } = await request.json();
      const result = await UserController.createTeam(env, sess.email, name);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team/join' && method === 'POST') {
      const { teamId } = await request.json();
      const result = await UserController.joinTeam(env, sess.email, teamId);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team/leave' && method === 'POST') {
      const result = await UserController.leaveTeam(env, sess.email);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team/invite' && method === 'POST') {
      const { email } = await request.json();
      const result = await UserController.inviteTeamMember(env, sess.email, email);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team/remove' && method === 'POST') {
      const { email } = await request.json();
      const result = await UserController.removeTeamMember(env, sess.email, email);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team/update-role' && method === 'POST') {
      const { email, role } = await request.json();
      const result = await UserController.updateTeamMemberRole(env, sess.email, email, role);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/user/team' && method === 'GET') {
      const team = await UserController.getTeam(env, sess.email);
      return new Response(JSON.stringify(team), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get API request history
    if (path === '/api/user/api-requests' && method === 'GET') {
      const usageLogs = await UserController.getApiRequests(env, sess.email);
      return new Response(JSON.stringify(usageLogs), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get usage history
    if (path === '/api/user/usage-history' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      const usageHistory = [];
      if (user.usage_daily) {
        Object.entries(user.usage_daily).forEach(([date, usage]) => {
          usageHistory.push({
            date,
            usage,
            model: 'openai/gpt-3.5-turbo' // Default model for simplicity
          });
        });
      }
      
      // Sort by date descending
      usageHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      return new Response(JSON.stringify(usageHistory), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get billing history
    if (path === '/api/user/billing-history' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      return new Response(JSON.stringify(user.billing?.invoices || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get subscription details
    if (path === '/api/user/subscription' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      const settings = await ConfigService.getAllSettings(env);
      const plan = settings.subscription_plans.find(p => p.id === user.subscription);
      return new Response(JSON.stringify({ plan }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Cancel subscription
    if (path === '/api/user/subscription' && method === 'DELETE') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      user.subscription = 'free';
      user.subscription_status = 'cancelled';
      user.subscription_end = null;
      await DB.set(env, `u:${sess.email}`, user);
      
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user activity
    if (path === '/api/user/activity' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      // Mock activity data - in real app, this would be stored in database
      const activity = [
        {
          time: new Date(Date.now() - 3600000).toISOString(),
          action: 'API Key Created',
          details: 'Created new API key for development'
        },
        {
          time: new Date(Date.now() - 86400000).toISOString(),
          action: 'Package Purchased',
          details: 'Purchased GPT-4 access package'
        },
        {
          time: new Date(Date.now() - 172800000).toISOString(),
          action: 'Team Created',
          details: 'Created "Development Team" with 3 members'
        }
      ];
      
      return new Response(JSON.stringify(activity), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user teams
    if (path === '/api/user/teams' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      // Mock teams data - in real app, this would fetch from database
      const teams = [
        {
          id: 'team-1',
          name: 'Development Team',
          role: 'Owner',
          members: 3
        },
        {
          id: 'team-2',
          name: 'Marketing Team',
          role: 'Member',
          members: 5
        }
      ];
      
      return new Response(JSON.stringify(teams), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get team invitations
    if (path === '/api/user/team-invitations' && method === 'GET') {
      const user = await DB.get(env, `u:${sess.email}`);
      if (!user) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      
      // Mock invitations data - in real app, this would fetch from database
      const invitations = [
        {
          id: 'invite-1',
          team_name: 'Design Team',
          invited_by: 'john@example.com',
          date: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      
      return new Response(JSON.stringify(invitations), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Accept team invitation
    if (path.match(/\/api\/user\/team-invitations\/[^/]+\/accept/) && method === 'POST') {
      const invitationId = path.split('/')[5];
      // In real app, this would update the database
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Reject team invitation
    if (path.match(/\/api\/user\/team-invitations\/[^/]+\/reject/) && method === 'POST') {
      const invitationId = path.split('/')[5];
      // In real app, this would update the database
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Team management endpoints
    if (path.match(/\/api\/teams\/[^/]+\/invite/) && method === 'POST') {
      const teamId = path.split('/')[3];
      const { email, role } = await request.json();
      // In real app, this would send an invitation
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.match(/\/api\/teams\/[^/]+\/invitations/) && method === 'GET') {
      const teamId = path.split('/')[3];
      // Mock pending invitations
      const invitations = [
        {
          id: 'inv-1',
          email: 'jane@example.com',
          role: 'member',
          date: new Date(Date.now() - 3600000).toISOString()
        }
      ];
      return new Response(JSON.stringify(invitations), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.match(/\/api\/teams\/[^/]+\/invitations\/[^/]+/) && method === 'DELETE') {
      const teamId = path.split('/')[3];
      const invitationId = path.split('/')[5];
      // In real app, this would cancel the invitation
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.match(/\/api\/teams\/[^/]+\/members/) && method === 'GET') {
      const teamId = path.split('/')[3];
      // Mock team members
      const members = [
        {
          email: 'john@example.com',
          role: 'owner',
          joined_at: new Date(Date.now() - 30 * 86400000).toISOString()
        },
        {
          email: 'jane@example.com',
          role: 'admin',
          joined_at: new Date(Date.now() - 15 * 86400000).toISOString()
        }
      ];
      return new Response(JSON.stringify(members), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.match(/\/api\/teams\/[^/]+\/members\/[^/]+/) && method === 'DELETE') {
      const teamId = path.split('/')[3];
      const memberEmail = decodeURIComponent(path.split('/')[5]);
      // In real app, this would remove the member
      return new Response(JSON.stringify({ ok: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Guest Chat API
  if (path === '/api/chat/guest' && method === 'POST') {
    const { message, chatId } = await request.json();
    
    // Check guest message limit
    const guestKey = `guest:${new URL(request.url).hostname}:${request.headers.get('user-agent')}`;
    const guestData = await DB.get(env, guestKey) || { messageCount: 0, chats: [] };
    
    const guestLimit = await ConfigService.getGuestLimit(env);
    if (guestData.messageCount >= guestLimit) {
      return new Response(JSON.stringify({ 
        err: 'Guest message limit reached. Please register or sign in for unlimited chat.' 
      }), { status: 429 });
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
          model: (await ConfigService.getAllSettings(env)).guest_models[0],
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

      // Save guest chat history
      guestData.messageCount++;
      const chatIndex = guestData.chats.findIndex(c => c.id === chatId);
      
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
        guestData.chats[chatIndex].messages.push(newMessage, aiMessage);
      } else {
        guestData.chats.push({
          id: chatId,
          title: message.substring(0, 50) + '...',
          created: new Date().toISOString(),
          messages: [newMessage, aiMessage]
        });
      }

      await DB.set(env, guestKey, guestData, 86400); // Expire after 24 hours

      return new Response(JSON.stringify({ ok: true, response: aiResponse }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Guest Chat API error:', error);
      return new Response(JSON.stringify({ 
        err: 'Failed to process chat',
        details: error.message 
      }), { status: 500 });
    }
  }

  // Get user available models
  if (path === '/api/user/models' && method === 'GET') {
    const user = await DB.get(env, `u:${sess.email}`);
    if (!user) {
      return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
    }
    
    // Combine default user models with unlocked models
    const settings = await ConfigService.getAllSettings(env);
    const availableModels = new Set([
      ...settings.user_models,
      ...(user.unlocked_models || [])
    ]);
    
    // Get model details
    try {
      const res = await fetch('https://openrouter.ai/api/v1/models');
      const data = await res.json();
      const models = data.data.filter(m => availableModels.has(m.id)).map(m => ({
        id: m.id,
        name: m.name,
        description: m.description
      }));
      
      return new Response(JSON.stringify(models), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error fetching model details:', error);
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Get chat by ID
  if (path.startsWith('/api/user/chat/') && method === 'GET') {
    const chatId = path.split('/').pop();
    const history = await DB.get(env, `chat:${sess.email}`) || [];
    const chat = history.find(h => h.id === chatId);
    if (!chat) {
      return new Response(JSON.stringify({ err: 'Chat not found' }), { status: 404 });
    }
    return new Response(JSON.stringify(chat), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // User Chat API
  if (path === '/api/chat' && method === 'POST') {
    const settings = await ConfigService.getAllSettings(env);
    const { message, chatId, model = settings.user_models[0] } = await request.json();
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

      // Check if model is available to user
      const availableModels = new Set([
        ...CONFIG.default_models.user,
        ...(user.unlocked_models || [])
      ]);
      
      if (!availableModels.has(model)) {
        return new Response(JSON.stringify({ 
          err: 'Model not available. Please purchase a package to unlock this model.' 
        }), { status: 403 });
      }

      // Call ai-proxy API
      const response = await fetch('https://ai-proxy.jasyscom-corp.workers.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${proxyApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
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
