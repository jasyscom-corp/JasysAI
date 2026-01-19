import { DB } from '../db/index.js';
import { AdminApp } from '../dashboard/admin/admin.pages.js';
import { AdminController } from '../dashboard/admin/admin.controller.js';
import { ContentController } from '../dashboard/admin/content.controller.js';
import { ContentManagementPage } from '../dashboard/admin/content.pages.js';
import { AIProvidersManagementPage } from '../dashboard/admin/providers.pages.js';
import { SubscriptionPlansManagementPage } from '../dashboard/admin/plans.pages.js';
import { CreditPackagesManagementPage } from '../dashboard/admin/packages.pages.js';

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
    const result = await AuthService.authenticateAdmin(env, user, pass);
    
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

    // Get Midtrans settings
    if (path === '/api/admin/midtrans' && method === 'GET') {
      const settings = await AdminController.getDashboardData(env);
      return new Response(JSON.stringify({
        server_key: settings.settings.midtrans_server_key || '',
        client_key: settings.settings.midtrans_client_key || '',
        environment: settings.settings.midtrans_environment || 'sandbox'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update Midtrans settings
    if (path === '/api/admin/midtrans' && method === 'POST') {
      const body = await request.json();
      const settings = await AdminController.updateSettings(env, {
        midtrans_server_key: body.server_key,
        midtrans_client_key: body.client_key,
        midtrans_environment: body.environment
      });
      return new Response(JSON.stringify(settings), {
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

    // Get user details
    if (path.startsWith('/api/admin/users/') && !path.endsWith('/logs') && !path.endsWith('/credits') && method === 'GET') {
      const email = decodeURIComponent(path.split('/')[4]);
      const userDetails = await AdminController.getUserDetails(env, email);
      if (!userDetails) {
        return new Response(JSON.stringify({ err: 'User not found' }), { status: 404 });
      }
      return new Response(JSON.stringify(userDetails), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Delete user
    if (path.startsWith('/api/admin/users/') && !path.endsWith('/logs') && !path.endsWith('/credits') && method === 'DELETE') {
      const email = decodeURIComponent(path.split('/')[4]);
      const result = await AdminController.deleteUser(env, email);
      if (result.err) {
        return new Response(JSON.stringify(result), { status: 404 });
      }
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add credits to user
    if (path.startsWith('/api/admin/users/') && path.endsWith('/credits') && method === 'POST') {
      const email = decodeURIComponent(path.split('/')[4]);
      const body = await request.json();
      const result = await AdminController.addCredits(env, email, body.amount);
      if (result.err) {
        return new Response(JSON.stringify(result), { status: 404 });
      }
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // AI Providers API
    if (path === '/api/admin/providers' && method === 'GET') {
      const providers = await AdminController.getAIProviders(env);
      return new Response(JSON.stringify(providers), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/admin/providers' && method === 'POST') {
      const providerData = await request.json();
      const result = await AdminController.addAIProvider(env, providerData);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/providers/') && method === 'PUT') {
      const providerId = decodeURIComponent(path.split('/')[4]);
      const updates = await request.json();
      const result = await AdminController.updateAIProvider(env, providerId, updates);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/providers/') && method === 'DELETE') {
      const providerId = decodeURIComponent(path.split('/')[4]);
      const result = await AdminController.deleteAIProvider(env, providerId);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Subscription Plans API
    if (path === '/api/admin/plans' && method === 'GET') {
      const plans = await AdminController.getSubscriptionPlans(env);
      return new Response(JSON.stringify(plans), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/admin/plans' && method === 'POST') {
      const planData = await request.json();
      const result = await AdminController.addSubscriptionPlan(env, planData);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/plans/') && method === 'PUT') {
      const planId = decodeURIComponent(path.split('/')[4]);
      const updates = await request.json();
      const result = await AdminController.updateSubscriptionPlan(env, planId, updates);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/plans/') && method === 'DELETE') {
      const planId = decodeURIComponent(path.split('/')[4]);
      const result = await AdminController.deleteSubscriptionPlan(env, planId);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Credit Packages API
    if (path === '/api/admin/packages' && method === 'GET') {
      const packages = await AdminController.getCreditPackages(env);
      return new Response(JSON.stringify(packages), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path === '/api/admin/packages' && method === 'POST') {
      const packageData = await request.json();
      const result = await AdminController.addCreditPackage(env, packageData);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/packages/') && method === 'PUT') {
      const packageId = decodeURIComponent(path.split('/')[4]);
      const updates = await request.json();
      const result = await AdminController.updateCreditPackage(env, packageId, updates);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (path.startsWith('/api/admin/packages/') && method === 'DELETE') {
      const packageId = decodeURIComponent(path.split('/')[4]);
      const result = await AdminController.deleteCreditPackage(env, packageId);
      return new Response(JSON.stringify({ ok: result }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  // User management page
  if (path.startsWith('/admin/users/') && !path.startsWith('/api/admin/users/') && method === 'GET') {
    const email = decodeURIComponent(path.split('/')[4]);
    const userDetails = await AdminController.getUserDetails(env, email);
    if (!userDetails) {
      return new Response('User not found', { status: 404 });
    }
    return new Response(getUserManagementPage(userDetails), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Users management page
  if (path === '/admin/users' && method === 'GET') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    return new Response(getUsersManagementPage(), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // AI Providers management page
  if (path === '/admin/providers' && method === 'GET') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const data = {
      providers: await AdminController.getAIProviders(env)
    };
    
    return new Response(AIProvidersManagementPage(data), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Subscription Plans management page
  if (path === '/admin/plans' && method === 'GET') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const data = {
      plans: await AdminController.getSubscriptionPlans(env)
    };
    
    return new Response(SubscriptionPlansManagementPage(data), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  // Credit Packages management page
  if (path === '/admin/packages' && method === 'GET') {
    const cookie = request.headers.get('cookie') || '';
    const token = cookie.split('adm_t=')[1]?.split(';')[0];
    
    if (!token) {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const sess = await DB.get(env, `sess:${token}`);
    if (!sess || sess.role !== 'admin') {
      return Response.redirect(`${url.origin}/admin`, 302);
    }
    
    const data = {
      packages: await AdminController.getCreditPackages(env)
    };
    
    return new Response(CreditPackagesManagementPage(data), {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  return new Response('Not Found', { status: 404 });
}

function getUserManagementPage(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management - Admin Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header h1 { color: #1e293b; font-size: 1.5rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .section { background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 2rem; }
        .section h2 { color: #1e293b; margin-bottom: 1rem; }
        .btn { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; margin-right: 0.5rem; }
        .btn:hover { background: #2563eb; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #b91c1c; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .table th { background: #f8fafc; color: #64748b; font-weight: 600; }
        .user-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
        .info-card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; }
        .info-card h3 { color: #64748b; font-size: 0.875rem; margin-bottom: 0.5rem; }
        .info-card .value { color: #1e293b; font-size: 1.5rem; font-weight: 600; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>User Management</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Dashboard</a>
                <a href="/admin/users" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">Users</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="user-info">
            <div class="info-card">
                <h3>Email</h3>
                <div class="value">${data.user.email}</div>
            </div>
            <div class="info-card">
                <h3>Name</h3>
                <div class="value">${data.user.name}</div>
            </div>
            <div class="info-card">
                <h3>Credits</h3>
                <div class="value">${data.user.credits}</div>
            </div>
            <div class="info-card">
                <h3>Total Usage</h3>
                <div class="value">${data.user.total_used}</div>
            </div>
            <div class="info-card">
                <h3>API Keys</h3>
                <div class="value">${data.user.api_keys?.length || 0}</div>
            </div>
            <div class="info-card">
                <h3>Unlocked Models</h3>
                <div class="value">${data.user.unlocked_models?.length || 0}</div>
            </div>
        </div>
        
        <div class="section">
            <h2>API Keys</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Last Used</th>
                    </tr>
                </thead>
                <tbody>
                    ${(data.user.api_keys || []).map(key => `
                        <tr>
                            <td>${key.key}</td>
                            <td>${key.name}</td>
                            <td>${new Date(key.created).toLocaleDateString()}</td>
                            <td>${key.lastUsed ? new Date(key.lastUsed).toLocaleDateString() : 'Never'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="section">
            <h2>Usage History</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Model</th>
                        <th>Cost (IDR)</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.logs.map(log => `
                        <tr>
                            <td>${new Date(log.time).toLocaleString()}</td>
                            <td>${log.model}</td>
                            <td>${log.cost ? log.cost.toFixed(2) : '0'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="section">
            <h2>Actions</h2>
            <button class="btn" onclick="addCredits()">Add Credits</button>
            <button class="btn btn-danger" onclick="deleteUser()">Delete User</button>
            <button class="btn" onclick="location.href='/admin/users'">Back to Users</button>
        </div>
    </div>
    
    <script>
        function addCredits() {
            const amount = prompt('Enter number of credits to add:');
            if (amount && !isNaN(amount)) {
                fetch('/api/admin/users/${encodeURIComponent(data.user.email)}/credits', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: parseInt(amount) })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('Credits added successfully');
                        location.reload();
                    } else {
                        alert('Error: ' + data.err);
                    }
                });
            }
        }
        
        function deleteUser() {
            if (confirm('Are you sure you want to delete this user?')) {
                fetch('/api/admin/users/${encodeURIComponent(data.user.email)}', {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('User deleted successfully');
                        location.href = '/admin/users';
                    } else {
                        alert('Error: ' + data.err);
                    }
                });
            }
        }
    </script>
</body>
</html>
  `;
}

function getUsersManagementPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Users Management - Admin Dashboard</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header h1 { color: #1e293b; font-size: 1.5rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .section { background: white; border-radius: 8px; border: 1px solid #e2e8f0; padding: 1.5rem; margin-bottom: 2rem; }
        .section h2 { color: #1e293b; margin-bottom: 1rem; }
        .btn { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; margin-right: 0.5rem; }
        .btn:hover { background: #2563eb; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #b91c1c; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
        .table th { background: #f8fafc; color: #64748b; font-weight: 600; }
        .search-box { width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 1rem; font-size: 0.875rem; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Users Management</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Dashboard</a>
                <a href="/admin/users" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">Users</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="section">
            <h2>Users</h2>
            <input type="text" id="userSearch" class="search-box" placeholder="Search users by email or name...">
            <table class="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Usage</th>
                        <th>Created</th>
                        <th>API Keys</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    <!-- User data will be loaded dynamically -->
                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        // Load users on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadUsers();
        });
        
        function loadUsers() {
            fetch('/api/admin/users')
                .then(res => res.json())
                .then(users => {
                    const tbody = document.getElementById('userTableBody');
                    tbody.innerHTML = users.map(user => \`
                        <tr>
                            <td>\${user.email}</td>
                            <td>\${user.name}</td>
                            <td>\${user.credits}</td>
                            <td>\${user.total_used}</td>
                            <td>\${new Date(user.created).toLocaleDateString()}</td>
                            <td>\${user.api_keys_count}</td>
                            <td>
                                <button class="btn" onclick="viewUser('\${user.email}')">View</button>
                                <button class="btn" onclick="addCredits('\${user.email}')">Add Credits</button>
                                <button class="btn btn-danger" onclick="deleteUser('\${user.email}')">Delete</button>
                            </td>
                        </tr>
                    \`).join('');
                })
                .catch(error => {
                    console.error('Error loading users:', error);
                });
        }
        
        function viewUser(email) {
            location.href = '/admin/users/' + encodeURIComponent(email);
        }
        
        function addCredits(email) {
            const amount = prompt('Enter number of credits to add:');
            if (amount && !isNaN(amount)) {
                fetch('/api/admin/users/' + encodeURIComponent(email) + '/credits', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: parseInt(amount) })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('Credits added successfully');
                        loadUsers();
                    } else {
                        alert('Error: ' + data.err);
                    }
                });
            }
        }
        
        function deleteUser(email) {
            if (confirm('Are you sure you want to delete this user?')) {
                fetch('/api/admin/users/' + encodeURIComponent(email), {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('User deleted successfully');
                        loadUsers();
                    } else {
                        alert('Error: ' + data.err);
                    }
                });
            }
        }
        
        // Search functionality
        document.getElementById('userSearch').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.getElementById('userTableBody').querySelectorAll('tr');
            
            rows.forEach(row => {
                const email = row.cells[0].textContent.toLowerCase();
                const name = row.cells[1].textContent.toLowerCase();
                const matchesSearch = email.includes(searchTerm) || name.includes(searchTerm);
                row.style.display = matchesSearch ? '' : 'none';
            });
        });
    </script>
</body>
</html>
  `;
}
