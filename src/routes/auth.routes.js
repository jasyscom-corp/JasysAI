import { DB } from '../db/index.js';
import { AuthService } from '../auth/auth.service.js';
import { LoginPage, RegisterPage, AdminLoginPage } from '../auth/auth.pages.js';

export async function authRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Login page
  if (path === '/app' || path === '/') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];
    if (token) {
      const sess = await DB.get(env, `sess:${token}`);
      if (sess && sess.role === 'user') {
        return Response.redirect(`${url.origin}/app/dashboard`, 302);
      }
    }
    return new Response(LoginPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Register page
  if (path === '/auth/register') {
    return new Response(RegisterPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }


  // Handle login POST
  if (path === '/auth/login' && method === 'POST') {
    const { email, pass } = await request.json();
    const result = await AuthService.authenticateUser(email, pass);
    
    if (result.ok) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `t=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`
        }
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Handle register POST
  if (path === '/auth/register' && method === 'POST') {
    const { name, email, pass } = await request.json();
    const result = await AuthService.registerUser(email, pass, name);
    
    if (result.ok) {
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `t=${result.token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`
        }
      });
    }
    
    return new Response(JSON.stringify(result), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }


  return new Response('Not Found', { status: 404 });
}