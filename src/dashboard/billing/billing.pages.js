export function BillingApp(user) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Billing Dashboard - Jasys AI</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f172a; color: #e2e8f0; }
        .header { background: #1e293b; border-bottom: 1px solid #334155; padding: 1rem 2rem; }
        .header h1 { color: #f1f5f9; font-size: 1.5rem; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
        .stat-card { background: #1e293b; padding: 1.5rem; border-radius: 8px; border: 1px solid #334155; }
        .stat-card h3 { color: #94a3b8; font-size: 0.875rem; margin-bottom: 0.5rem; }
        .stat-card .value { color: #f1f5f9; font-size: 2rem; font-weight: 600; }
        .section { background: #1e293b; border-radius: 8px; border: 1px solid #334155; padding: 1.5rem; margin-bottom: 2rem; }
        .section h2 { color: #f1f5f9; margin-bottom: 1rem; }
        .btn { background: #3b82f6; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 6px; cursor: pointer; font-size: 0.875rem; margin-right: 0.5rem; }
        .btn:hover { background: #2563eb; }
        .btn-danger { background: #dc2626; }
        .btn-danger:hover { background: #b91c1c; }
        .table { width: 100%; border-collapse: collapse; }
        .table th, .table td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #334155; }
        .table th { background: #334155; color: #94a3b8; font-weight: 600; }
        .search-box { width: 100%; padding: 0.75rem; border: 1px solid #334155; border-radius: 6px; margin-bottom: 1rem; font-size: 0.875rem; background: #0f172a; color: #e2e8f0; }
        .filter-select { padding: 0.75rem; border: 1px solid #334155; border-radius: 6px; margin-right: 0.5rem; font-size: 0.875rem; background: #0f172a; color: #e2e8f0; }
        a { color: #3b82f6; text-decoration: none; }
        a:hover { color: #2563eb; }
    </style>
</head>
<body>
    <div class="header">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-white">Billing Dashboard</h1>
            <nav class="flex gap-4">
                <a href="/dashboard" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Dashboard</a>
                <a href="/dashboard/teams" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Teams</a>
                <a href="/dashboard/billing" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Billing</a>
                <a href="/logout" class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container">
        <div class="stats">
            <div class="stat-card">
                <h3>Current Plan</h3>
                <div class="value">${user.subscription || 'Free'}</div>
            </div>
            <div class="stat-card">
                <h3>Credits Available</h3>
                <div class="value">${user.credits || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Total Usage</h3>
                <div class="value">${user.total_used || 0}</div>
            </div>
            <div class="stat-card">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Quick Actions</h3>
                <div class="mt-4 space-y-2">
                    <button onclick="location.href='/dashboard/billing/upgrade'" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Upgrade Plan</button>
                    <button onclick="location.href='/dashboard/billing/purchase'" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Purchase Credits</button>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Subscription Plan</h2>
            <div id="subscriptionPlan">
                <p>Loading subscription details...</p>
            </div>
        </div>
        
        <div class="section">
            <h2>Billing History</h2>
            <div id="billingHistory">
                <p>Loading billing history...</p>
            </div>
        </div>
    </div>
    
    <script>
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
                        subscriptionPlan.innerHTML = '<p>No active subscription. <a href="/dashboard/billing/upgrade">Upgrade now</a>.</p>';
                    } else {
                        subscriptionPlan.innerHTML = 
                            `<div>
                                <h3>${data.plan.name}</h3>
                                <p>Price: ${data.plan.price} IDR/month</p>
                                <p>Credits: ${data.plan.credits} credits/month</p>
                                <p>Users: ${data.plan.users} users</p>
                                <button onclick="location.href='/dashboard/billing/upgrade'" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition mr-2">Change Plan</button>
                                <button onclick="cancelSubscription()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">Cancel Subscription</button>
                            </div>`;
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
                        billingHistory.innerHTML = '<p>No billing history.</p>';
                    } else {
                        const tableHTML = 
                            `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Description</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.map(item => 
                                        `<tr>
                                            <td>${new Date(item.date).toLocaleDateString()}</td>
                                            <td>${item.description}</td>
                                            <td>${item.amount} IDR</td>
                                            <td>${item.status}</td>
                                        </tr>`
                                    ).join('')}
                                </tbody>
                            </table>`;
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