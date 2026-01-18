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

  // Static assets - serve logo and favicon
  if (path.startsWith('/assets/')) {
    if (path === '/assets/logo.png') {
      // Return a simple SVG logo as PNG (for now)
      const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" fill="#7c3aed"/><text x="32" y="40" font-family="Arial" font-size="24" fill="white" text-anchor="middle">AI</text></svg>`;
      return new Response(logoSvg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000'
        }
      });
    }
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

  // Landing page
  if (path === '/') {
    return authRoutes(request, env);
  }

  // Admin routes
  if (path.startsWith('/admin')) {
    return adminRoutes(request, env);
  }

  // User dashboard routes (including /app)
  if (path.startsWith('/app')) {
    return userRoutes(request, env);
  }

  // Authentication routes
  if (path.startsWith('/auth/')) {
    return authRoutes(request, env);
  }

  // API routes
  if (path.startsWith('/api/')) {
    return apiRoutes(request, env);
  }

  // OpenAI-compatible API routes (no /api prefix)
  if (path === '/v1/chat/completions') {
    return apiRoutes(request, env);
  }

  // Guest chat interface
  if (path === '/chat/guest') {
    return new Response(getGuestChatHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // User chat interface
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
    return new Response(getUserChatHTML(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // 404 - Custom Not Found Page
  return new Response(getNotFoundPage(path), { 
    status: 404,
    headers: { 'Content-Type': 'text/html' }
  });
}