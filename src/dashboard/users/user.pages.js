// @ts-nocheck
export function UserApp(user) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Dashboard - Jasys AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-200 min-h-screen">
    <div class="header bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-white">User Dashboard</h1>
            <nav class="flex gap-4">
                <a href="/dashboard" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Dashboard</a>
                <a href="/dashboard/teams" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Teams</a>
                <a href="/dashboard/billing" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Billing</a>
                <a href="/logout" class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container max-w-6xl mx-auto p-6">
        <div class="stats grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div class="stat-card bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Credits Available</h3>
                <p class="text-3xl font-bold text-white">${user.credits || 0}</p>
            </div>
            <div class="stat-card bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Total Usage</h3>
                <p class="text-3xl font-bold text-white">${user.total_used || 0}</p>
            </div>
            <div class="stat-card bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Teams</h3>
                <p class="text-3xl font-bold text-white">${user.teams?.length || 0}</p>
            </div>
            <div class="stat-card bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Quick Actions</h3>
                <div class="mt-4 space-y-2">
                    <button onclick="location.href='/dashboard/teams'" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Manage Teams</button>
                    <button onclick="location.href='/dashboard/billing'" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Billing</button>
                </div>
            </div>
        </div>
        
        <div class="section bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Recent Activity</h2>
            <div id="activityLog" class="space-y-4">
                <p class="text-slate-400">Loading activity...</p>
            </div>
        </div>
        
        <div class="section bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Team Management</h2>
            <div id="teamManagement">
                <p class="text-slate-400">Loading teams...</p>
            </div>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            loadActivity();
            loadTeams();
        });
        
        function loadActivity() {
            fetch('/api/user/activity')
                .then(res => res.json())
                .then(data => {
                    const activityLog = document.getElementById('activityLog');
                    if (data.length === 0) {
                        activityLog.innerHTML = '<p class="text-slate-400">No recent activity.</p>';
                    } else {
                        const activityHTML = data.map(activity => {
                            return '<div class="bg-slate-700 rounded-lg p-4 border border-slate-600">' +
                                '<div class="text-sm text-slate-400 mb-1">' + new Date(activity.time).toLocaleString() + '</div>' +
                                '<div class="font-medium text-white">' + activity.action + '</div>' +
                                '<div class="text-sm text-blue-400">' + activity.details + '</div>' +
                            '</div>';
                        }).join('');
                        activityLog.innerHTML = activityHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading activity:', error);
                });
        }
        
        function loadTeams() {
            fetch('/api/user/teams')
                .then(res => res.json())
                .then(teams => {
                    const teamManagement = document.getElementById('teamManagement');
                    if (teams.length === 0) {
                        teamManagement.innerHTML = '<p class="text-slate-400">No teams found. <a href="/dashboard/teams/create" class="text-blue-400 hover:text-blue-300">Create a team</a>.</p>';
                    } else {
                        const tableHTML = 
                            '<div class="overflow-x-auto">' +
                                '<table class="min-w-full divide-y divide-slate-700">' +
                                    '<thead class="bg-slate-700">' +
                                        '<tr>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Team Name</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Members</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody class="bg-slate-800 divide-y divide-slate-700">' +
                                        teams.map(team => {
                                            return '<tr>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-white">' + team.name + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + team.role + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + team.members + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap">' +
                                                    '<button onclick="location.href=\'/dashboard/teams/' + team.id + '\'" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm mr-2">View</button>' +
                                                    '<button onclick="location.href=\'/dashboard/teams/' + team.id + '/invite\'" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">Invite</button>' +
                                                '</td>' +
                                            '</tr>';
                                        }).join('') +
                                    '</tbody>' +
                                '</table>' +
                            '</div>';
                        teamManagement.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading teams:', error);
                });
        }
    </script>
</body>
</html>`;
}
