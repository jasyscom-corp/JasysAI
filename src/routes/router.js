import { DB } from '../db/index.js';
import { AuthService } from '../auth/auth.service.js';
import { ContentPage } from '../utils/content.pages.js';
import { ApiDocsPage } from '../utils/api-docs.pages.js';
import { authRoutes } from './auth.routes.js';
import { adminRoutes } from './admin.routes.js';
import { userRoutes } from './user.routes.js';
import { apiRoutes } from './api.routes.js';

export async function setupRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  // Static assets
  if (path.startsWith('/assets/')) {
    return new Response('Asset not found', { status: 404 });
  }

  // Content pages
  if (path === '/about' || path === '/blog' || path === '/contact' ||
      path === '/privacy-policy' || path === '/terms-of-service' || path === '/security') {
    try {
      const pageKey = path.replace('/', '').replace('-', '_');
      const html = await ContentPage(env, pageKey);
      return new Response(html, { headers: { 'Content-Type': 'text/html' } });
    } catch (error) {
      console.error('Error serving content page:', error);
      // Return a basic HTML error page instead of JSON
      const errorHtml = getBasicErrorPage(path, error.message);
      return new Response(errorHtml, {
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }

  // API Documentation page
  if (path === '/api-docs') {
    const html = ApiDocsPage();
    return new Response(html, { headers: { 'Content-Type': 'text/html' } });
  }

  // Authentication routes
  if (path.startsWith('/auth/') || path === '/') {
    return authRoutes(request, env);
  }

  // Admin routes
  if (path.startsWith('/admin')) {
    return adminRoutes(request, env);
  }

  // User dashboard routes
  if (path.startsWith('/app/') || path === '/app') {
    return userRoutes(request, env);
  }

  // API routes
  if (path.startsWith('/api/')) {
    return apiRoutes(request, env);
  }

  // OpenAI-compatible API routes (no /api prefix)
  if (path === '/v1/chat/completions') {
    return apiRoutes(request, env);
  }

  // Chat interface
  if (path === '/chat') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];
    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess) {
      return Response.redirect(`${url.origin}/app`, 302);
    }
    return new Response(getChatHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // 404
  return new Response('Not Found', { status: 404 });
}

function getChatHTML() {
  return `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-[#020617] text-slate-200 min-h-screen flex flex-col">
  <div class="flex-1 flex">
    <div class="w-64 bg-slate-900 border-r border-slate-800 p-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-white">Chat History</h2>
        <button onclick="newChat()" class="text-brand hover:text-brand/80">New</button>
      </div>
      <div id="chatList" class="space-y-2">
        <!-- Chat history loaded here -->
      </div>
    </div>
    
    <div class="flex-1 flex flex-col">
      <div class="bg-slate-900 border-b border-slate-800 p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold text-white">AI Assistant</h1>
        <button onclick="location.href='/app'" class="text-slate-400 hover:text-white">Dashboard</button>
      </div>
      
      <div id="chatMessages" class="flex-1 overflow-y-auto p-6 space-y-4">
        <div class="text-center text-slate-500 py-8">Start a conversation...</div>
      </div>
      
      <div class="bg-slate-900 border-t border-slate-800 p-4">
        <div class="flex gap-4">
          <input id="messageInput" type="text" placeholder="Type your message..." 
                 class="flex-1 bg-slate-800 border border-slate-700 p-3 rounded-xl text-white focus:border-brand focus:outline-none"
                 onkeypress="if(event.key==='Enter') sendMessage()">
          <button onclick="sendMessage()" class="bg-brand px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">Send</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentChatId = null;
    
    async function loadChatHistory() {
      const res = await fetch('/api/user/history', { headers: { 'Authorization': localStorage.getItem('t') } });
      if (res.ok) {
        const history = await res.json();
        const list = document.getElementById('chatList');
        list.innerHTML = history.map(h => \`
          <div class="p-3 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer" onclick="loadChat('\${h.id}')">
            <div class="text-sm font-medium text-white">\${h.title}</div>
            <div class="text-xs text-slate-500">\${new Date(h.date).toLocaleDateString()}</div>
          </div>
        \`).join('');
      }
    }
    
    function newChat() {
      currentChatId = 'chat_' + Date.now();
      document.getElementById('chatMessages').innerHTML = '<div class="text-center text-slate-500 py-8">Start a conversation...</div>';
    }
    
    async function sendMessage() {
      const input = document.getElementById('messageInput');
      const message = input.value.trim();
      if (!message) return;
      
      if (!currentChatId) newChat();
      
      const messagesDiv = document.getElementById('chatMessages');
      messagesDiv.innerHTML += \`
        <div class="flex justify-end">
          <div class="bg-brand p-4 rounded-2xl max-w-md text-white">\${message}</div>
        </div>
      \`;
      
      input.value = '';
      
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Authorization': localStorage.getItem('t'), 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, chatId: currentChatId })
        });
        
        const data = await res.json();
        if (data.ok) {
          messagesDiv.innerHTML += \`
            <div class="flex justify-start">
              <div class="bg-slate-800 p-4 rounded-2xl max-w-md text-white">\${data.response}</div>
            </div>
          \`;
        } else {
          messagesDiv.innerHTML += \`
            <div class="flex justify-start">
              <div class="bg-red-900 p-4 rounded-2xl max-w-md text-white">Error: \${data.err}</div>
            </div>
          \`;
        }
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } catch (error) {
        messagesDiv.innerHTML += \`
          <div class="flex justify-start">
            <div class="bg-red-900 p-4 rounded-2xl max-w-md text-white">Connection error</div>
          </div>
        \`;
      }
    }
    
    loadChatHistory();
  </script>
</body></html>`;
}

function getBasicErrorPage(path, errorMessage) {
  const pageNames = {
    '/about': 'About Us',
    '/blog': 'Blog',
    '/contact': 'Contact Us',
    '/privacy-policy': 'Privacy Policy',
    '/terms-of-service': 'Terms of Service',
    '/security': 'Security'
  };
  
  const title = pageNames[path] || 'Page';
  
  return `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex items-center justify-center px-6">
  <div class="max-w-2xl w-full text-center">
    <div class="mb-8">
      <svg class="w-20 h-20 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    </div>
    <h1 class="text-4xl font-bold mb-4">${title}</h1>
    <h2 class="text-2xl text-yellow-400 mb-6">Page Temporarily Unavailable</h2>
    <p class="text-slate-300 mb-8">
      We're sorry, but we're experiencing technical difficulties with this page.
      Our team has been notified and is working to resolve the issue.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/" class="inline-flex items-center justify-center gap-2 bg-brand px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        Back to Home
      </a>
      <button onclick="location.reload()" class="inline-flex items-center justify-center gap-2 bg-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Try Again
      </button>
    </div>
    <p class="text-slate-500 text-sm mt-8">Error ID: ${Date.now()}</p>
  </div>
</body></html>`;
}