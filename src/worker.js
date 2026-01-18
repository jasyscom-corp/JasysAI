import { setupRoutes } from './routes/index.js';
import { logger } from './utils/logger.js';

export default {
  async fetch(request, env, ctx) {
    try {
      logger.info('Incoming request', { 
        method: request.method, 
        url: request.url,
        userAgent: request.headers.get('user-agent')
      });

      const response = await setupRoutes(request, env);
      
      logger.info('Request completed', { 
        status: response.status,
        url: request.url
      });

      return response;
    } catch (error) {
      logger.error('Unhandled error', { 
        error: error.message,
        stack: error.stack,
        url: request.url 
      });

      // Return custom 500 error page
      return new Response(getInternalServerErrorPage(error), {
        status: 500,
        headers: { 'Content-Type': 'text/html' }
      });
    }
  },

  async scheduled(event, env, ctx) {
    try {
      logger.info('Scheduled task started', {
        scheduledTime: event.scheduledTime
      });

      // Only run cleanup if KV namespace is available
      if (env.JASYSAI_KV) {
        // Clean up old sessions
        await cleanupOldSessions(env);
        
        // Clean up old logs
        await cleanupOldLogs(env);
      }

      logger.info('Scheduled task completed');
    } catch (error) {
      logger.error('Scheduled task failed', {
        error: error.message,
        stack: error.stack
      });
    }
  }
};

async function cleanupOldSessions(env) {
  const sessions = await env.JASYSAI_KV.list({ prefix: 'sess:' });
  const now = Date.now();
  const weekAgo = now - (7 * 24 * 60 * 60 * 1000);

  for (const session of sessions.keys) {
    const sessionData = await env.JASYSAI_KV.get(session.name);
    if (sessionData) {
      const parsed = JSON.parse(sessionData);
      const sessionTime = new Date(parsed.created || parsed.time).getTime();
      
      if (sessionTime < weekAgo) {
        await env.JASYSAI_KV.delete(session.name);
        logger.info('Cleaned up old session', { key: session.name });
      }
    }
  }
}

async function cleanupOldLogs(env) {
  const logs = await env.JASYSAI_KV.list({ prefix: 'log:' });
  const now = Date.now();
  const monthAgo = now - (30 * 24 * 60 * 60 * 1000);

  for (const log of logs.keys) {
    const logTime = parseInt(log.name.split(':')[1]);
    
    if (logTime < monthAgo) {
      await env.JASYSAI_KV.delete(log.name);
      logger.info('Cleaned up old log', { key: log.name });
    }
  }
}

function getInternalServerErrorPage(error) {
  return `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen flex items-center justify-center px-6">
  <div class="max-w-2xl w-full text-center">
    <div class="mb-8">
      <svg class="w-20 h-20 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    </div>
    <h1 class="text-4xl font-bold mb-4">Something went wrong</h1>
    <h2 class="text-2xl text-yellow-400 mb-6">500 Internal Server Error</h2>
    <p class="text-slate-300 mb-8">
      We're sorry, but something went wrong on our end.
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
    <p class="text-slate-500 text-sm mt-8">Error Details: ${error.message}</p>
    <p class="text-slate-500 text-sm">Error ID: ${Date.now()}</p>
  </div>
</body></html>`;
}