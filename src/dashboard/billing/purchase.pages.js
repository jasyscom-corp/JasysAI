export function PurchaseCreditsApp() {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Credits - Jasys AI</title>
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
        <div class="max-w-5xl mx-auto">
            <h2 class="text-3xl font-bold text-white mb-8 text-center">Purchase Credits</h2>
            
            <div class="grid md:grid-cols-3 gap-6" id="creditPackagesContainer">
                <!-- Credit packages will be loaded dynamically -->
                <div class="col-span-full text-center text-slate-400">Loading credit packages...</div>
            </div>
        </div>
    </div>
    
    <script>
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            loadCreditPackages();
        });
        
        function loadCreditPackages() {
            // Fetch credit packages from configuration (in real app, this would be from API)
            const creditPackages = [
                {
                    id: 'small',
                    name: 'Small Pack',
                    credits: 5000,
                    price: 15000,
                    discount: null
                },
                {
                    id: 'medium',
                    name: 'Medium Pack',
                    credits: 15000,
                    price: 40000,
                    discount: '10% OFF'
                },
                {
                    id: 'large',
                    name: 'Large Pack',
                    credits: 35000,
                    price: 85000,
                    discount: '15% OFF'
                },
                {
                    id: 'xl',
                    name: 'XL Pack',
                    credits: 75000,
                    price: 160000,
                    discount: '20% OFF'
                },
                {
                    id: 'xxl',
                    name: 'XXL Pack',
                    credits: 150000,
                    price: 300000,
                    discount: '25% OFF'
                },
                {
                    id: 'enterprise',
                    name: 'Enterprise Pack',
                    credits: 500000,
                    price: 950000,
                    discount: '30% OFF'
                }
            ];
            
            const container = document.getElementById('creditPackagesContainer');
            container.innerHTML = creditPackages.map(pkg => \`
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    <h3 class="text-xl font-bold text-white mb-2">\${pkg.name}</h3>
                    \${pkg.discount ? '<div class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm mb-4">\\${pkg.discount}</div>' : ''}
                    <div class="text-3xl font-bold text-white mb-2">\${pkg.credits.toLocaleString('id-ID')} Credits</div>
                    <div class="text-2xl font-bold text-purple-400 mb-6">Rp \${pkg.price.toLocaleString('id-ID')}</div>
                    <button 
                        onclick="purchaseCredits('${pkg.id}')"
                        class="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Purchase Now
                    </button>
                </div>
            \`).join('');
        }
        
        function purchaseCredits(packageId) {
            if (confirm('Are you sure you want to purchase this credit package?')) {
                fetch('/api/user/credits/purchase', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        packageId: packageId
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert(\`Successfully purchased \${data.creditsAdded.toLocaleString('id-ID')} credits!\`);
                        location.href = '/app/dashboard/billing';
                    } else {
                        alert('Error: ' + data.err);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while purchasing credits');
                });
            }
        }
    </script>
</body>
</html>
  `;
}
