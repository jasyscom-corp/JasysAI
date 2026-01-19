export function UsageApp(user) {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usage Dashboard - Jasys AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3 font-bold text-2xl">
                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                Jasys AI
            </div>
            <div class="hidden md:flex items-center gap-6">
                <a href="/app/dashboard" class="text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/app/dashboard/teams" class="text-slate-300 hover:text-white transition">Teams</a>
                <a href="/app/dashboard/billing" class="text-slate-300 hover:text-white transition">Billing</a>
                <a href="/app/dashboard/usage" class="text-slate-300 hover:text-white transition">Usage</a>
                <a href="/logout" class="text-red-400 hover:text-red-300 transition">Logout</a>
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
                <a href="/app/dashboard" class="block text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/app/dashboard/teams" class="block text-slate-300 hover:text-white transition">Teams</a>
                <a href="/app/dashboard/billing" class="block text-slate-300 hover:text-white transition">Billing</a>
                <a href="/app/dashboard/usage" class="block text-slate-300 hover:text-white transition">Usage</a>
                <a href="/logout" class="block text-red-400 hover:text-red-300 transition">Logout</a>
            </div>
        </div>
    </nav>
    
    <div class="pt-32 pb-20 px-6">
        <div class="max-w-7xl mx-auto">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Total Usage</h3>
                    <p class="text-3xl font-bold text-white">${user.total_used || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Today's Usage</h3>
                    <p class="text-3xl font-bold text-white">${user.today_usage || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Active Days</h3>
                    <p class="text-3xl font-bold text-white">${user.active_days || 0}</p>
                </div>
            </div>
            
            <!-- Usage History -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Usage History</h2>
                <div id="usageHistory">
                    <p class="text-slate-400">Loading usage history...</p>
                </div>
            </div>
            
            <!-- API Request History -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-4">API Request History</h2>
                <div id="apiRequestHistory">
                    <p class="text-slate-400">Loading API request history...</p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            loadUsageHistory();
            loadAPIRequestHistory();
        });
        
        function loadUsageHistory() {
            fetch('/api/user/usage-history')
                .then(res => res.json())
                .then(data => {
                    const usageHistory = document.getElementById('usageHistory');
                    if (data.length === 0) {
                        usageHistory.innerHTML = '<p class="text-slate-400">No usage history.</p>';
                    } else {
                        const tableHTML = \`
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-slate-700">
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Usage</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Model</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        \${data.map(item => \`
                                            <tr class="border-b border-slate-700">
                                                <td class="py-3 px-4 text-white">\${new Date(item.date).toLocaleDateString()}</td>
                                                <td class="py-3 px-4 text-white">\${item.usage}</td>
                                                <td class="py-3 px-4 text-slate-300">\${item.model}</td>
                                            </tr>
                                        \`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        \`;
                        usageHistory.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading usage history:', error);
                });
        }
        
        function loadAPIRequestHistory() {
            fetch('/api/user/api-requests')
                .then(res => res.json())
                .then(data => {
                    const apiRequestHistory = document.getElementById('apiRequestHistory');
                    if (data.length === 0) {
                        apiRequestHistory.innerHTML = '<p class="text-slate-400">No API request history.</p>';
                    } else {
                        const tableHTML = \`
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-slate-700">
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Endpoint</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Response Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        \${data.map(item => \`
                                            <tr class="border-b border-slate-700">
                                                <td class="py-3 px-4 text-white">\${new Date(item.date).toLocaleString()}</td>
                                                <td class="py-3 px-4 text-slate-300">\${item.endpoint}</td>
                                                <td class="py-3 px-4">
                                                    <span class="px-2 py-1 rounded-full text-xs \${item.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}">
                                                        \${item.status}
                                                    </span>
                                                </td>
                                                <td class="py-3 px-4 text-white">\${item.response_time}ms</td>
                                            </tr>
                                        \`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        \`;
                        apiRequestHistory.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading API request history:', error);
                });
        }
    </script>
</body>
</html>
  `;
}
