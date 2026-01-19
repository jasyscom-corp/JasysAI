export function TeamsApp(user) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teams Dashboard - Jasys AI</title>
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
            <h1 class="text-2xl font-bold text-white">Teams Dashboard</h1>
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
                <h3>Total Teams</h3>
                <div class="value">${user.teams?.length || 0}</div>
            </div>
            <div class="stat-card">
                <h3>Total Members</h3>
                <div class="value">${user.total_members || 0}</div>
            </div>
            <div class="stat-card">
                <h3 class="text-lg font-semibold text-slate-400 mb-2">Quick Actions</h3>
                <div class="mt-4 space-y-2">
                    <button onclick="location.href='/dashboard/teams/create'" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">Create Team</button>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Your Teams</h2>
            <div id="teamsList">
                <p>Loading teams...</p>
            </div>
        </div>
        
        <div class="section">
            <h2>Team Invitations</h2>
            <div id="teamInvitations">
                <p>Loading invitations...</p>
            </div>
        </div>
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            loadTeams();
            loadInvitations();
        });
        
        function loadTeams() {
            fetch('/api/user/teams')
                .then(res => res.json())
                .then(teams => {
                    const teamsList = document.getElementById('teamsList');
                    if (teams.length === 0) {
                        teamsList.innerHTML = '<p>No teams found. <a href="/dashboard/teams/create">Create a team</a>.</p>';
                    } else {
                        const tableHTML = 
                            `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Team Name</th>
                                        <th>Role</th>
                                        <th>Members</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${teams.map(team => 
                                        `<tr>
                                            <td>${team.name}</td>
                                            <td>${team.role}</td>
                                            <td>${team.members}</td>
                                            <td>
                                                <button class="btn" onclick="location.href='/dashboard/teams/${team.id}'">View</button>
                                                <button class="btn" onclick="location.href='/dashboard/teams/${team.id}/invite'">Invite</button>
                                            </td>
                                        </tr>`
                                    ).join('')}
                                </tbody>
                            </table>`;
                        teamsList.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading teams:', error);
                });
        }
        
        function loadInvitations() {
            fetch('/api/user/team-invitations')
                .then(res => res.json())
                .then(invitations => {
                    const teamInvitations = document.getElementById('teamInvitations');
                    if (invitations.length === 0) {
                        teamInvitations.innerHTML = '<p>No pending invitations.</p>';
                    } else {
                        const tableHTML = 
                            `<table class="table">
                                <thead>
                                    <tr>
                                        <th>Team Name</th>
                                        <th>Invited By</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${invitations.map(invitation => 
                                        `<tr>
                                            <td>${invitation.team_name}</td>
                                            <td>${invitation.invited_by}</td>
                                            <td>${new Date(invitation.date).toLocaleDateString()}</td>
                                            <td>
                                                <button class="btn" onclick="acceptInvitation('${invitation.id}')">Accept</button>
                                                <button class="btn btn-danger" onclick="rejectInvitation('${invitation.id}')">Reject</button>
                                            </td>
                                        </tr>`
                                    ).join('')}
                                </tbody>
                            </table>`;
                        teamInvitations.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading invitations:', error);
                });
        }
        
        function acceptInvitation(invitationId) {
            fetch('/api/user/team-invitations/' + invitationId + '/accept', {
                method: 'POST'
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert('Invitation accepted successfully');
                    loadTeams();
                    loadInvitations();
                } else {
                    alert('Error: ' + data.err);
                }
            });
        }
        
        function rejectInvitation(invitationId) {
            fetch('/api/user/team-invitations/' + invitationId + '/reject', {
                method: 'POST'
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert('Invitation rejected successfully');
                    loadInvitations();
                } else {
                    alert('Error: ' + data.err);
                }
            });
        }
    </script>
</body>
</html>
  `;
}