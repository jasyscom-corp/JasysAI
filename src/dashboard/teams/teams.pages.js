export function TeamsApp(user) {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teams Dashboard - Jasys AI</title>
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
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Total Teams</h3>
                    <p class="text-3xl font-bold text-white">${user.teams?.length || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Total Members</h3>
                    <p class="text-3xl font-bold text-white">${user.total_members || 0}</p>
                </div>
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                    <h3 class="text-lg font-semibold text-slate-400 mb-2">Quick Actions</h3>
                    <div class="mt-4 space-y-2">
                        <button onclick="location.href='/app/dashboard/teams/create'" class="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition">Create Team</button>
                    </div>
                </div>
            </div>
            
            <!-- Your Teams -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Your Teams</h2>
                <div id="teamsList">
                    <p class="text-slate-400">Loading teams...</p>
                </div>
            </div>
            
            <!-- Team Invitations -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-4">Team Invitations</h2>
                <div id="teamInvitations">
                    <p class="text-slate-400">Loading invitations...</p>
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
            loadTeams();
            loadInvitations();
        });
        
        function loadTeams() {
            fetch('/api/user/teams')
                .then(res => res.json())
                .then(teams => {
                    const teamsList = document.getElementById('teamsList');
                    if (teams.length === 0) {
                        teamsList.innerHTML = '<p class="text-slate-400">No teams found. <a href="/app/dashboard/teams/create" class="text-purple-400 hover:text-purple-300">Create a team</a>.</p>';
                    } else {
                        const tableHTML = \`
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-slate-700">
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Team Name</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Role</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Members</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        \${teams.map(team => \`
                                            <tr class="border-b border-slate-700">
                                                <td class="py-3 px-4 text-white">\${team.name}</td>
                                                <td class="py-3 px-4 text-slate-300">\${team.role}</td>
                                                <td class="py-3 px-4 text-slate-300">\${team.members}</td>
                                                <td class="py-3 px-4">
                                                    <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm mr-2" onclick="location.href='/app/dashboard/teams/\${team.id}'">View</button>
                                                    <button class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm" onclick="location.href='/app/dashboard/teams/\${team.id}/invite'">Invite</button>
                                                </td>
                                            </tr>
                                        \`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        \`;
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
                        teamInvitations.innerHTML = '<p class="text-slate-400">No pending invitations.</p>';
                    } else {
                        const tableHTML = \`
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="border-b border-slate-700">
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Team Name</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Invited By</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th class="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        \${invitations.map(invitation => \`
                                            <tr class="border-b border-slate-700">
                                                <td class="py-3 px-4 text-white">\${invitation.team_name}</td>
                                                <td class="py-3 px-4 text-slate-300">\${invitation.invited_by}</td>
                                                <td class="py-3 px-4 text-slate-300">\${new Date(invitation.date).toLocaleDateString()}</td>
                                                <td class="py-3 px-4">
                                                    <button class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm mr-2" onclick="acceptInvitation('\${invitation.id}')">Accept</button>
                                                    <button class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm" onclick="rejectInvitation('\${invitation.id}')">Reject</button>
                                                </td>
                                            </tr>
                                        \`).join('')}
                                    </tbody>
                                </table>
                            </div>
                        \`;
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
