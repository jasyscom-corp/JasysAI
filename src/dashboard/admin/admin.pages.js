import { LOGO_SVG } from '../../utils/assets.js';

export function AdminApp(data) {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Jasys AI</title>
    <meta name="description" content="Admin dashboard for Jasys AI management and analytics.">
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>">
    <meta name="theme-color" content="#7c3aed">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
</head>
<body class="bg-[#020617] text-slate-200 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3 font-bold text-2xl">
                ${LOGO_SVG} Admin Dashboard
            </div>
            <div class="hidden md:flex items-center gap-6">
                <a href="/admin/dashboard" class="text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/admin/users" class="text-slate-300 hover:text-white transition">Users</a>
                <a href="/admin/providers" class="text-slate-300 hover:text-white transition">AI Providers</a>
                <a href="/admin/plans" class="text-slate-300 hover:text-white transition">Subscription Plans</a>
                <a href="/admin/packages" class="text-slate-300 hover:text-white transition">Credit Packages</a>
                <a href="/admin/settings" class="text-slate-300 hover:text-white transition">System Settings</a>
                <button onclick="logout()" class="text-red-500 hover:text-red-400 transition">Logout</button>
            </div>
            <button onclick="toggleMobileMenu()" class="md:hidden text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
        </div>
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800/50">
            <div class="px-6 py-4 space-y-3">
                <a href="/admin/dashboard" class="block text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/admin/users" class="block text-slate-300 hover:text-white transition">Users</a>
                <a href="/admin/providers" class="block text-slate-300 hover:text-white transition">AI Providers</a>
                <a href="/admin/plans" class="block text-slate-300 hover:text-white transition">Subscription Plans</a>
                <a href="/admin/packages" class="block text-slate-300 hover:text-white transition">Credit Packages</a>
                <a href="/admin/settings" class="block text-slate-300 hover:text-white transition">System Settings</a>
                <button onclick="logout()" class="text-red-500 hover:text-red-400 block transition">Logout</button>
            </div>
        </div>
    </nav>

    <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <div class="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Total Users</div>
                <div class="text-5xl font-black text-white">${data.userCount || 0}</div>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <div class="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Active Today</div>
                <div class="text-5xl font-black text-white">${data.activeToday || 0}</div>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <div class="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Total Usage</div>
                <div class="text-5xl font-black text-white">${data.totalUsage || 0}</div>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
                <div class="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Quick Actions</div>
                <div class="mt-4 space-y-2">
                    <button onclick="location.href='/admin/users'" class="w-full bg-brand px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">Manage Users</button>
                    <button onclick="location.href='/admin/content'" class="w-full bg-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">Manage Content</button>
                </div>
            </div>
        </div>

        <!-- User Management Section -->
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] mb-12">
            <h2 class="text-2xl font-bold text-white mb-6">User Management</h2>
            <div class="flex flex-col md:flex-row gap-4 mb-6">
                <input type="text" id="userSearch" class="flex-1 bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="Search users by email or name...">
                <select id="userFilter" class="bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition">
                    <option value="all">All Users</option>
                    <option value="active">Active Users</option>
                    <option value="inactive">Inactive Users</option>
                </select>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                        <tr>
                            <th class="p-5">Email</th>
                            <th class="p-5">Name</th>
                            <th class="p-5">Credits</th>
                            <th class="p-5">Usage</th>
                            <th class="p-5">Created</th>
                            <th class="p-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody" class="divide-y divide-slate-800">
                        <!-- User data will be loaded dynamically -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Recent Activity Section -->
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
            <h2 class="text-2xl font-bold text-white mb-6">Recent Activity</h2>
            <div id="recentActivity" class="space-y-4">
                ${data.logs?.map(log => `
                    <div class="bg-dark p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition">
                        <div class="flex justify-between items-start mb-2">
                            <div class="font-bold text-white">${log.email}</div>
                            <div class="text-slate-500 text-xs">${new Date(log.time).toLocaleString()}</div>
                        </div>
                        <div class="text-blue-400 font-mono text-sm">${log.model || log.action || 'Usage'}</div>
                        ${log.cost ? `<div class="text-green-400 text-sm mt-1">Rp ${log.cost.toFixed(2)}</div>` : ''}
                    </div>
                `).join('') || '<div class="text-slate-500 text-center py-8">No recent activity</div>'}
            </div>
        </div>
    </div>

    <script>
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }

        function logout() {
            localStorage.clear();
            location.href = '/admin';
        }

        // Load users on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadUsers();
        });

        function loadUsers() {
            fetch('/api/admin/users')
                .then(res => res.json())
                .then(users => {
                    const tbody = document.getElementById('userTableBody');
                    tbody.innerHTML = users.map(user => `
                        <tr>
                            <td class="p-5 text-white">${user.email}</td>
                            <td class="p-5 text-white">${user.name}</td>
                            <td class="p-5 text-blue-400">${user.credits}</td>
                            <td class="p-5 text-purple-400">${user.total_used}</td>
                            <td class="p-5 text-slate-400">${new Date(user.created).toLocaleDateString()}</td>
                            <td class="p-5">
                                <button class="bg-brand text-white px-4 py-2 rounded-xl font-bold hover:bg-brand/90 transition mr-2" onclick="viewUser('${user.email}')">View</button>
                                <button class="bg-green-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-green-500 transition mr-2" onclick="addCredits('${user.email}')">Add Credits</button>
                                <button class="bg-red-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-red-500 transition" onclick="deleteUser('${user.email}')">Delete</button>
                            </td>
                        </tr>
                    `).join('');
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

        // Filter functionality
        document.getElementById('userFilter').addEventListener('change', function() {
            loadUsers(); // Reload users with filter
        });
    </script>
</body>
</html>
  `;
}
