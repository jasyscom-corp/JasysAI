// @ts-nocheck
export function TeamInviteApp(team) {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invite Members - ${team.name} - Jasys AI</title>
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
            <!-- Page Title -->
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-white mb-2">Invite Members - ${team.name}</h1>
                <p class="text-slate-400">Manage your team members and send invitations</p>
            </div>
            
            <!-- Invite Form -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Invite New Member</h2>
                <div class="flex flex-col md:flex-row gap-4 mb-4">
                    <input type="email" id="emailInput" placeholder="Enter email address" class="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
                    <select id="roleSelect" class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none">
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button onclick="sendInvitation()" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">Send Invitation</button>
                </div>
            </div>
            
            <!-- Pending Invitations -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
                <h2 class="text-2xl font-bold text-white mb-4">Pending Invitations</h2>
                <div id="pendingInvitations">
                    <p class="text-slate-400">Loading pending invitations...</p>
                </div>
            </div>
            
            <!-- Team Members -->
            <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                <h2 class="text-2xl font-bold text-white mb-4">Team Members</h2>
                <div id="teamMembers">
                    <p class="text-slate-400">Loading team members...</p>
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
            loadPendingInvitations();
            loadTeamMembers();
        });
        
        function sendInvitation() {
            const email = document.getElementById('emailInput').value;
            const role = document.getElementById('roleSelect').value;
            
            if (!email) {
                alert('Please enter an email address');
                return;
            }
            
            fetch('/api/teams/${team.id}/invite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role })
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert('Invitation sent successfully');
                    document.getElementById('emailInput').value = '';
                    loadPendingInvitations();
                } else {
                    alert('Error: ' + data.err);
                }
            });
        }
        
        function loadPendingInvitations() {
            fetch('/api/teams/${team.id}/invitations')
                .then(res => res.json())
                .then(invitations => {
                    const pendingInvitations = document.getElementById('pendingInvitations');
                    if (invitations.length === 0) {
                        pendingInvitations.innerHTML = '<p class="text-slate-400">No pending invitations.</p>';
                    } else {
                        const tableHTML = 
                            '<div class="overflow-x-auto">' +
                                '<table class="w-full">' +
                                    '<thead>' +
                                        '<tr class="border-b border-slate-700">' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Role</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>' +
                                        invitations.map(invitation => {
                                            return '<tr class="border-b border-slate-700">' +
                                                '<td class="py-3 px-4 text-white">' + invitation.email + '</td>' +
                                                '<td class="py-3 px-4 text-slate-300">' + invitation.role + '</td>' +
                                                '<td class="py-3 px-4 text-slate-300">' + new Date(invitation.date).toLocaleDateString() + '</td>' +
                                                '<td class="py-3 px-4">' +
                                                    '<button onclick="cancelInvitation(\'' + invitation.id + '\')" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm">Cancel</button>' +
                                                '</td>' +
                                            '</tr>';
                                        }).join('') +
                                    '</tbody>' +
                                '</table>' +
                            '</div>';
                        pendingInvitations.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading pending invitations:', error);
                });
        }
        
        function loadTeamMembers() {
            fetch('/api/teams/${team.id}/members')
                .then(res => res.json())
                .then(members => {
                    const teamMembers = document.getElementById('teamMembers');
                    if (members.length === 0) {
                        teamMembers.innerHTML = '<p class="text-slate-400">No team members.</p>';
                    } else {
                        const tableHTML = 
                            '<div class="overflow-x-auto">' +
                                '<table class="w-full">' +
                                    '<thead>' +
                                        '<tr class="border-b border-slate-700">' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Role</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Joined</th>' +
                                            '<th class="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody>' +
                                        members.map(member => {
                                            return '<tr class="border-b border-slate-700">' +
                                                '<td class="py-3 px-4 text-white">' + member.email + '</td>' +
                                                '<td class="py-3 px-4 text-slate-300">' + member.role + '</td>' +
                                                '<td class="py-3 px-4 text-slate-300">' + new Date(member.joined_at).toLocaleDateString() + '</td>' +
                                                '<td class="py-3 px-4">' +
                                                    '<button onclick="removeMember(\'' + member.email + '\')" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm">Remove</button>' +
                                                '</td>' +
                                            '</tr>';
                                        }).join('') +
                                    '</tbody>' +
                                '</table>' +
                            '</div>';
                        teamMembers.innerHTML = tableHTML;
                    }
                })
                .catch(error => {
                    console.error('Error loading team members:', error);
                });
        }
        
        function cancelInvitation(invitationId) {
            fetch('/api/teams/${team.id}/invitations/' + invitationId, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert('Invitation cancelled successfully');
                    loadPendingInvitations();
                } else {
                    alert('Error: ' + data.err);
                }
            });
        }
        
        function removeMember(email) {
            if (confirm('Are you sure you want to remove this member?')) {
                fetch('/api/teams/${team.id}/members/' + encodeURIComponent(email), {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.ok) {
                        alert('Member removed successfully');
                        loadTeamMembers();
                    } else {
                        alert('Error: ' + data.err);
                    }
                });
            }
        }
    </script>
</body>
</html>`;
}
