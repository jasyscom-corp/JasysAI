export function AdminApp(data) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - JasyAI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 2rem; }
        .header h1 { color: #1e293b; font-size: 1.5rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; }
        .stat-card h3 { color: #64748b; font-size: 0.875rem; margin-bottom: 0.5rem; }
        .stat-card .value { color: #1e293b; font-size: 2rem; font-weight: 600; }
        .logs { background: white; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; margin-bottom: 2rem; }
        .logs h2 { padding: 1rem 1.5rem; border-bottom: 1px solid #e2e8f0; color: #1e293b; }
        .log-item { padding: 1rem 1.5rem; border-bottom: 1px solid #f1f5f9; }
        .log-item:last-child { border-bottom: none; }
        .log-time { color: #64748b; font-size: 0.875rem; }
        .log-email { color: #1e293b; font-weight: 500; }
        .log-action { color: #059669; }
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
        .filter-select { padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; margin-right: 0.5rem; font-size: 0.875rem; }
    </style>
</head>
<body>
    <div class="header">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1>Admin Dashboard</h1>
            <nav style="display: flex; gap: 1rem;">
                <a href="/admin/dashboard" style="color: #1e293b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px; background: #f1f5f9;">Dashboard</a>
                <a href="/admin/users" style="color: #64748b; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Users</a>
                <a href="/admin" style="color: #dc2626; text-decoration: none; padding: 0.5rem 1rem; border-radius: 4px;">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="stats">
            <div class="stat-card">
                <h3>Total Users</h3>
                <div class="value">${data.userCount || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Active Today</h3>
                <div class="value">${data.activeToday || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Total Usage</h3>
                <div class="value">${data.totalUsage || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Quick Actions</h3>
                <div style="margin-top: 0.5rem;">
                    <a href="/admin/users" style="display: inline-block; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; margin-right: 0.5rem;">Manage Users</a>
                    <a href="/admin/content" style="display: inline-block; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none;">Manage Content</a>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>User Management</h2>
            <input type="text" id="userSearch" class="search-box" placeholder="Search users by email or name...">
            <select id="userFilter" class="filter-select">
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
            </select>
            <table class="table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>Usage</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="userTableBody">
                    <!-- User data will be loaded dynamically -->
                </tbody>
            </table>
        </div>
        
        <div class="logs">
            <h2>Recent Activity</h2>
            ${data.logs?.map(log => `
                <div class="log-item">
                    <div class="log-time">${new Date(log.time).toLocaleString()}</div>
                    <div class="log-email">${log.email}</div>
                    <div class="log-action">${log.model || log.action || 'Usage'}</div>
                    <div style="color: #3b82f6; font-size: 0.875rem;">${log.cost ? log.cost.toFixed(2) + ' IDR' : ''}</div>
                </div>
            `).join('') || '<div class="log-item">No recent activity</div>'}
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
            window.location.href = '/admin/users/' + encodeURIComponent(email);
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
        
        // Search and filter functionality
        document.getElementById('userSearch').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const filter = document.getElementById('userFilter').value;
            const rows = document.getElementById('userTableBody').querySelectorAll('tr');
            
            rows.forEach(row => {
                const email = row.cells[0].textContent.toLowerCase();
                const name = row.cells[1].textContent.toLowerCase();
                const matchesSearch = email.includes(searchTerm) || name.includes(searchTerm);
                row.style.display = matchesSearch ? '' : 'none';
            });
        });
        
        document.getElementById('userFilter').addEventListener('change', function() {
            loadUsers(); // Reload users with filter
        });
    </script>
</body>
</html>
  `;
}