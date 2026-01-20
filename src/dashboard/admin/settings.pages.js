import { LOGO_SVG } from '../../utils/assets.js';

export function SystemSettingsManagementPage(data) {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>System Settings - Admin Dashboard</title>
    <meta name="description" content="System settings management for Jasys AI admin dashboard.">
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
                ${LOGO_SVG} System Settings
            </div>
            <div class="hidden md:flex items-center gap-6">
                <a href="/admin/dashboard" class="text-slate-300 hover:text-white transition">Dashboard</a>
                <a href="/admin/users" class="text-slate-300 hover:text-white transition">Users</a>
                <a href="/admin/providers" class="text-slate-300 hover:text-white transition">AI Providers</a>
                <a href="/admin/plans" class="text-slate-300 hover:text-white transition">Subscription Plans</a>
                <a href="/admin/packages" class="text-slate-300 hover:text-white transition">Credit Packages</a>
                <a href="/admin/settings" class="text-white font-bold">System Settings</a>
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
                <a href="/admin/settings" class="block text-white font-bold">System Settings</a>
                <button onclick="logout()" class="text-red-500 hover:text-red-400 block transition">Logout</button>
            </div>
        </div>
    </nav>

    <div class="max-w-4xl mx-auto px-6 py-8">
        <!-- Settings Form -->
        <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem]">
            <h2 class="text-3xl font-bold text-white mb-6">System Configuration</h2>
            <form id="settingsForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Admin Credentials -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-400 mb-2">Admin Username</label>
                        <input type="text" id="adminUser" name="admin_user" value="${data.settings.admin_user}" 
                               class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                               placeholder="Enter admin username">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-400 mb-2">Admin Password</label>
                        <input type="password" id="adminPass" name="admin_pass" value="${data.settings.admin_pass}" 
                               class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                               placeholder="Enter admin password">
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Default Credits -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-400 mb-2">Default Credits</label>
                        <input type="number" id="defaultCredits" name="default_credits" value="${data.settings.default_credits}" 
                               class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                               placeholder="Enter default credits" min="0">
                    </div>
                    <!-- Profit Margin -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-400 mb-2">Profit Margin</label>
                        <input type="number" id="profitMargin" name="profit_margin" value="${data.settings.profit_margin}" 
                               class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                               placeholder="Enter profit margin" step="0.01" min="1.0">
                    </div>
                    <!-- IDR Rate -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-400 mb-2">IDR Exchange Rate</label>
                        <input type="number" id="idrRate" name="idr_rate" value="${data.settings.idr_rate}" 
                               class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                               placeholder="Enter IDR rate" step="0.01" min="0">
                    </div>
                </div>

                <!-- Guest Limit -->
                <div>
                    <label class="block text-sm font-semibold text-slate-400 mb-2">Guest Message Limit</label>
                    <input type="number" id="guestLimit" name="guest_limit" value="${data.settings.guest_limit}" 
                           class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                           placeholder="Enter guest message limit" min="1">
                </div>

                <!-- Midtrans Settings -->
                <div class="border-t border-slate-800 pt-6 mt-6">
                    <h3 class="text-xl font-bold text-white mb-4">Payment Gateway (Midtrans)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-slate-400 mb-2">Server Key</label>
                            <input type="text" id="midtransServerKey" value="${data.settings.midtrans_server_key || ''}" 
                                   class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                                   placeholder="Enter Midtrans server key">
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-400 mb-2">Client Key</label>
                            <input type="text" id="midtransClientKey" value="${data.settings.midtrans_client_key || ''}" 
                                   class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" 
                                   placeholder="Enter Midtrans client key">
                        </div>
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-semibold text-slate-400 mb-2">Environment</label>
                        <select id="midtransEnvironment" 
                                class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition">
                            <option value="sandbox" ${data.settings.midtrans_environment === 'sandbox' ? 'selected' : ''}>Sandbox</option>
                            <option value="production" ${data.settings.midtrans_environment === 'production' ? 'selected' : ''}>Production</option>
                        </select>
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="pt-6">
                    <button type="submit" class="w-full bg-brand text-white px-6 py-4 rounded-xl font-bold hover:bg-brand/90 transition">
                        Save Settings
                    </button>
                </div>
            </form>
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

        // Handle form submission
        document.getElementById('settingsForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                admin_user: document.getElementById('adminUser').value,
                admin_pass: document.getElementById('adminPass').value,
                default_credits: parseInt(document.getElementById('defaultCredits').value),
                profit_margin: parseFloat(document.getElementById('profitMargin').value),
                idr_rate: parseFloat(document.getElementById('idrRate').value),
                guest_limit: parseInt(document.getElementById('guestLimit').value)
            };

            fetch('/api/admin/settings/system', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    alert('Settings saved successfully');
                    location.reload();
                } else {
                    alert('Error saving settings');
                }
            })
            .catch(error => {
                console.error('Error saving settings:', error);
                alert('Error saving settings');
            });
        });

        // Handle Midtrans settings separately (optional)
        document.getElementById('midtransServerKey').addEventListener('change', function() {
            updateMidtransSettings();
        });

        document.getElementById('midtransClientKey').addEventListener('change', function() {
            updateMidtransSettings();
        });

        document.getElementById('midtransEnvironment').addEventListener('change', function() {
            updateMidtransSettings();
        });

        function updateMidtransSettings() {
            const midtransData = {
                server_key: document.getElementById('midtransServerKey').value,
                client_key: document.getElementById('midtransClientKey').value,
                environment: document.getElementById('midtransEnvironment').value
            };

            fetch('/api/admin/midtrans', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(midtransData)
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log('Midtrans settings updated');
                }
            })
            .catch(error => {
                console.error('Error updating Midtrans settings:', error);
            });
        }
    </script>
</body>
</html>
  `;
}
