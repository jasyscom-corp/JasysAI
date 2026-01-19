// @ts-nocheck
export function TeamInviteApp(team) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invite Members - ${team.name} - Jasys AI</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-900 text-slate-200 min-h-screen">
    <div class="header bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-white">Invite Members - ${team.name}</h1>
            <nav class="flex gap-4">
                <a href="/dashboard" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Dashboard</a>
                <a href="/dashboard/teams" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Teams</a>
                <a href="/dashboard/billing" class="text-slate-300 hover:text-white px-4 py-2 rounded-lg">Billing</a>
                <a href="/logout" class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg">Logout</a>
            </nav>
        </div>
    </div>
    
    <div class="container max-w-6xl mx-auto p-6">
        <div class="section bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Invite New Member</h2>
            <div class="flex flex-col md:flex-row gap-4 mb-4">
                <input type="email" id="emailInput" placeholder="Enter email address" class="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
                <select id="roleSelect" class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none">
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
                <button onclick="sendInvitation()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">Send Invitation</button>
            </div>
        </div>
        
        <div class="section bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
            <h2 class="text-xl font-bold text-white mb-4">Pending Invitations</h2>
            <div id="pendingInvitations">
                <p class="text-slate-400">Loading pending invitations...</p>
            </div>
        </div>
        
        <div class="section bg-slate-800 rounded-xl border border-slate-700 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Team Members</h2>
            <div id="teamMembers">
                <p class="text-slate-400">Loading team members...</p>
            </div>
        </div>
    </div>
    
    <script>
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
                                '<table class="min-w-full divide-y divide-slate-700">' +
                                    '<thead class="bg-slate-700">' +
                                        '<tr>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody class="bg-slate-800 divide-y divide-slate-700">' +
                                        invitations.map(invitation => {
                                            return '<tr>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-white">' + invitation.email + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + invitation.role + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + new Date(invitation.date).toLocaleDateString() + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap">' +
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
                                '<table class="min-w-full divide-y divide-slate-700">' +
                                    '<thead class="bg-slate-700">' +
                                        '<tr>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Email</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Role</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Joined</th>' +
                                            '<th class="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>' +
                                        '</tr>' +
                                    '</thead>' +
                                    '<tbody class="bg-slate-800 divide-y divide-slate-700">' +
                                        members.map(member => {
                                            return '<tr>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-white">' + member.email + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + member.role + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap text-slate-300">' + new Date(member.joined_at).toLocaleDateString() + '</td>' +
                                                '<td class="px-6 py-4 whitespace-nowrap">' +
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