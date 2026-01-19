import { DB } from '../db/index.js';
import { UserApp } from '../dashboard/users/user.pages.js';
import { TeamsApp } from '../dashboard/teams/teams.pages.js';
import { TeamInviteApp } from '../dashboard/teams/team-invite.pages.js';
import { BillingApp } from '../dashboard/billing/billing.pages.js';
import { UsageApp } from '../dashboard/usage/usage.pages.js';
import { UserController } from '../dashboard/users/user.controller.js';

export async function userRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Login page (/app)
  if (path === '/app') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];
    if (token) {
      const sess = await DB.get(env, `sess:${token}`);
      if (sess && sess.role === 'user') {
        return Response.redirect(`${url.origin}/app/dashboard`, 302);
      }
    }
    // Import LoginPage here to avoid circular dependency
    const { LoginPage } = await import('../auth/auth.pages.js');
    return new Response(LoginPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // User dashboard
  if (path === '/app/dashboard' || path === '/app/') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];

    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'user') {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const user = await DB.get(env, `u:${sess.email}`);
    if (!user) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    return new Response(UserApp(user), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Teams dashboard
  if (path === '/app/dashboard/teams') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];

    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'user') {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const user = await DB.get(env, `u:${sess.email}`);
    if (!user) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    return new Response(TeamsApp(user), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Team invite page
  if (path.match(/\/app\/dashboard\/teams\/[^/]+\/invite/)) {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];

    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'user') {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const teamId = path.split('/')[5];
    const team = await DB.get(env, `team:${teamId}`);
    if (!team) {
      return new Response('Team not found', { status: 404 });
    }

    return new Response(TeamInviteApp(team), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Billing dashboard
  if (path === '/app/dashboard/billing') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];

    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'user') {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const user = await DB.get(env, `u:${sess.email}`);
    if (!user) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    return new Response(BillingApp(user), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Usage dashboard
  if (path === '/app/dashboard/usage') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('t=')[1]?.split(';')[0];

    if (!token) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'user') {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    const user = await DB.get(env, `u:${sess.email}`);
    if (!user) {
      return Response.redirect(`${url.origin}/app`, 302);
    }

    return new Response(UsageApp(user), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response('Not Found', { status: 404 });
}