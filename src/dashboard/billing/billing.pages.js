export function BillingApp(user) {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Billing Dashboard - Jasys AI</title>
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
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Current Plan</h3>
                    <p class="text-3xl font-bold text-white">${user.subscription || 'Free'}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Credits Available</h3>
                    <p class="text-3xl font-bold text-white">${user.credits || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Total Usage</h3>
                    <p class="text-3xl font-bold text-white">${user.total_used || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Quick Actions</h3>
                    <div class="mt-4 space-y-2">
                        <button onclick="location.href='/app/dashboard/billing/upgrade'" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">Upgrade Plan</button>
                        <button onclick="location.href='/app/dashboard/billing/purchase'" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">Purchase Credits</button>
                    </div>
                </div>
            </div>
            
            <!-- Subscription Plan -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Subscription Plan</h2>
                <div id="subscriptionPlan">
                    <p class="text-slate-400">Loading subscription details...</p>
                </div>
            </div>
            
            <!-- Billing History -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-4">Billing History</h2>
                <div id="billingHistory">
                    <p class="text-slate-400">Loading billing history...</p>
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
            loadSubscription();
            loadBillingHistory();
        });
        
        function loadSubscription() {
            fetch('/api/user/subscription')
                .then(res => res.json())
                .then(data => {
                    const subscriptionPlan = document.getElementById('subscriptionPlan');
                    if (!data.plan) {
                        subscriptionPlan.innerHTML = '<p class="text-slate-400">No active subscription. <a href="/app/dashboard/billing/upgrade" class="text-purple-400 hover:text-purple-300">Upgrade now</a>.</p>';
                    } else {
                        subscriptionPlan.innerHTML = \`
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 class="text-xl font-bold text-white mb-2">\${data.plan.name}</h3>
                                    <p class="text-slate-400 mb-2">Price: \${data.plan.price} IDR/month</p>
                                    <p class="text-slate-400 mb-2">Credits: \${data.plan.credits} credits/month</p>
                                    <p class="text-slate-400 mb-4">Users: \${data.plan.users} users</p>
                                    <div class="flex flex-wrap gap-2">
                                        <button onclick="location.href='/app/dashboard/billing/upgrade'" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">Change Plan</button>
                                        <button onclick="cancelSubscription()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">Cancel Subscription</button>
                                    </div>
                                </div>
                                <div class="bg-slate-700/50 rounded-lg p-4">
                                    <h4 class="font-bold text-white mb-2">Plan Features</h4>
                                    <ul class="space-y-2 text-slate-300">
                                        \${data.plan.features.map(feature => \`<li class="flex items-center gap-2"><svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>\${feature}</li>\`).join('')}
                                    </ul>
                                </div>
                            </div>
                        \`;
                    }
                })
                .catch(error => {
                    console.error('Error loading subscription:', error);
                });
        }
        
        function loadBillingHistory() {
            fetch('/api/user/billing-history')
                .then(res => res.json())
                .then(data => {
                    const billingHistory = document.getElementById('billingHistory');
                    if (data.length === 0) {
                        billingHistory.innerHTML = '<p class="text-slate-400">No billing history.</p>';
                    } else {
                        const tableHTML = \`
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-slate-700">
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Description</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Amount</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        \${data.map(item => \`
                                            <tr class="border-b border-slate-700">
                                                <td class="py-3 px-4 text-white">\${new Date(item.date).toLocaleDateString()}</td>
                                                <td class="py-3 px-4 text-slate-300">\${item.description}</td>
                                                <td class="py-3 px-4 text-white">\${item.amount} IDR</td>
                                                <td class="py-3 px-4">
                                                    <span class="px-2 py-1 rounded-full text-xs \${item.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}">
                                                        \${item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        \`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        \`;
                        billingHistory.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading billing history:', error);
                });
        }
        
        function cancelSubscription() {
            if (confirm('Are you sure you want to cancel your subscription?')) {
                fetch('/api/user/subscription', {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('Subscription cancelled successfully');
                        loadSubscription();
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
