import { DB } from '../db/index.js';
import { AdminApp } from '../dashboard/admin/admin.pages.js';
import { AdminController } from '../dashboard/admin/admin.controller.js';

export async function adminRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Admin login page
  if (path === '/admin' && method === 'GET') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    if (token) {
      const sess = await DB.get(env, `sess:${token}`);
      if (sess && sess.role === 'admin') {
        return Response.redirect(`${url.origin}/admin/dashboard`, 302);
      }
    }
    const { AdminLoginPage } = await import('../auth/auth.pages.js');
    return new Response(AdminLoginPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Admin dashboard
  if (path === '/admin/dashboard') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const data = await AdminController.getDashboardData(env);
    return new Response(AdminApp(data), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Handle admin login POST
  if (path === '/admin/login' && method === 'POST') {
    const { user, pass } = await request.json();
    const { AuthService } = await import('../auth/auth.service.js');
    const result = await AuthService.authenticateAdmin(user, pass);
    
    if (result.ok) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `adm_t=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`
        }
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Admin API routes
  if (path.startsWith('/api/admin/')) {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return new Response(JSON.stringify({ err: 'Unauthorized' }), { status: 401 });
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return new Response(JSON.stringify({ err: 'Unauthorized' }), { status: 401 });
    }

    // Get settings
    if (path === '/api/admin/settings' && method === 'GET') {
      const settings = await AdminController.getDashboardData(env);
      return new Response(JSON.stringify(settings.settings), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update settings
    if (path === '/api/admin/settings' && method === 'POST') {
      const settings = await request.json();
      const result = await AdminController.updateSettings(env, settings);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get users
    if (path === '/api/admin/users' && method === 'GET') {
      const users = await AdminController.getUsers(env);
      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get user logs
    if (path.startsWith('/api/admin/users/') && path.endsWith('/logs') && method === 'GET') {
      const email = path.split('/')[4];
      const logs = await AdminController.getUserLogs(env, email);
      return new Response(JSON.stringify(logs), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Not Found', { status: 404 });
}