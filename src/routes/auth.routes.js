import { DB } from '../db/index.js';
import { AuthService } from '../auth/auth.service.js';
import { LoginPage, RegisterPage, AdminLoginPage, LandingPage } from '../auth/auth.pages.js';

export async function authRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Landing page
  if (path === '/') {
    return new Response(LandingPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Handle login POST
  if (path === '/auth/login' && method === 'POST') {
    const { email, pass } = await request.json();
    const result = await AuthService.authenticateUser(env, email, pass);
    
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
    try {
      const { name, email, pass } = await request.json();
      const result = await AuthService.registerUser(env, email, pass, name);

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
    } catch (error) {
      console.error('Register error:', error);
      return new Response(JSON.stringify({ err: 'Registration failed. Please try again.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // Register page
  if (path === '/auth/register' && method === 'GET') {
    return new Response(RegisterPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }


  return new Response('Not Found', { status: 404 });
}