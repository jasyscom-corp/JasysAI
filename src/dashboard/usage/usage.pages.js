export function UsageApp(user) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Usage Dashboard - Jasys AI</title>
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
            <h1 class="text-2xl font-bold text-white">Usage Dashboard</h1>
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
                <h3>Total Usage</h3>
                <div class="value">${user.total_used || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Today's Usage</h3>
                <div class="value">${user.today_usage || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Active Days</h3>
                <div class="value">${user.active_days || 0}</div>
            </div>
        </div>
        
        <div class="section">
            <h2>Usage History</h2>
            <div id="usageHistory">
                <p>Loading usage history...</p>
            </div>
        </div>
        
        <div class="section">
            <h2>API Request History</h2>
            <div id="apiRequestHistory">
                <p>Loading API request history...</p>
            </div>
        </div>
    </div>
    
    <script>
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
                        usageHistory.innerHTML = '<p>No usage history.</p>';
                    } else {
                        const tableHTML = 
                            `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Usage</th>
                                        <th>Model</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.map(item => 
                                        `<tr>
                                            <td>${new Date(item.date).toLocaleDateString()}</td>
                                            <td>${item.usage}</td>
                                            <td>${item.model}</td>
                                        </tr>`
                                    ).join('')}
                                </tbody>
                            </table>`;
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
                        apiRequestHistory.innerHTML = '<p>No API request history.</p>';
                    } else {
                        const tableHTML = 
                            `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Endpoint</th>
                                        <th>Status</th>
                                        <th>Response Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${data.map(item => 
                                        `<tr>
                                            <td>${new Date(item.date).toLocaleString()}</td>
                                            <td>${item.endpoint}</td>
                                            <td>${item.status}</td>
                                            <td>${item.response_time}ms</td>
                                        </tr>`
                                    ).join('')}
                                </tbody>
                            </table>`;
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