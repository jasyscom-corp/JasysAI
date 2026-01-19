export function UpgradePlanApp() {
  return `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upgrade Plan - Jasys AI</title>
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
            <h2 class="text-3xl font-bold text-white mb-8 text-center">Choose Your Plan</h2>
            
            <div class="grid md:grid-cols-3 gap-6" id="plansContainer">
                <!-- Plans will be loaded dynamically -->
                <div class="col-span-full text-center text-slate-400">Loading plans...</div>
            </div>
        </div>
    </div>
    
    <script>
        function toggleMobileMenu() {
            const menu = document.getElementById('mobileMenu');
            menu.classList.toggle('hidden');
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            loadPlans();
        });
        
        function loadPlans() {
            // Fetch plans from configuration (in real app, this would be from API)
            const plans = [
                {
                    id: 'free',
                    name: 'Free',
                    price: 0,
                    credits: 1000,
                    users: 1,
                    features: [
                        '1,000 credits/month',
                        'Basic AI models',
                        'Single user',
                        'Community support',
                        'Basic analytics'
                    ],
                    popular: false
                },
                {
                    id: 'basic',
                    name: 'Basic',
                    price: 25000,
                    credits: 10000,
                    users: 3,
                    features: [
                        '10,000 credits/month',
                        'GPT-4 access',
                        'Up to 3 users',
                        'Priority support',
                        'Advanced analytics',
                        'API access'
                    ],
                    popular: true
                },
                {
                    id: 'premium',
                    name: 'Premium',
                    price: 50000,
                    credits: 30000,
                    users: 10,
                    features: [
                        '30,000 credits/month',
                        'GPT-4 + Claude 3 Opus',
                        'Up to 10 users',
                        '24/7 support',
                        'Team management',
                        'Custom integrations',
                        'API access'
                    ],
                    popular: false
                },
                {
                    id: 'ultimate',
                    name: 'Ultimate',
                    price: 100000,
                    credits: 100000,
                    users: 50,
                    features: [
                        '100,000 credits/month',
                        'All models included',
                        'Up to 50 users',
                        'Dedicated account manager',
                        'Custom model training',
                        'Enterprise support',
                        'Unlimited API access'
                    ],
                    popular: false
                }
            ];
            
            const container = document.getElementById('plansContainer');
            container.innerHTML = plans.map(plan => \`
                <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative \${plan.popular ? 'border-purple-500 ring-1 ring-purple-500' : ''}">
                    \${plan.popular ? '<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>' : ''}
                    <h3 class="text-2xl font-bold text-white mb-2">\${plan.name}</h3>
                    <div class="text-4xl font-bold text-white mb-4">
                        Rp \${plan.price.toLocaleString('id-ID')}
                        <span class="text-sm text-slate-400 font-normal">/month</span>
                    </div>
                    <div class="mb-6">
                        <p class="text-slate-300 mb-2">\${plan.credits.toLocaleString('id-ID')} credits/month</p>
                        <p class="text-slate-300">\${plan.users} user\${plan.users > 1 ? 's' : ''}</p>
                    </div>
                    <ul class="space-y-3 mb-8">
                        \${plan.features.map(feature => \`
                            <li class="flex items-center gap-2 text-slate-300">
                                <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                \${feature}
                            </li>
                        \`).join('')}
                    </ul>
                    <button 
                        onclick="subscribeToPlan('${plan.id}')"
                        class="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                        \${plan.id === 'free' ? 'disabled' : ''}
                    >
                        \${plan.id === 'free' ? 'Current Plan' : 'Upgrade Now'}
                    </button>
                </div>
            \`).join('');
        }
        
        function subscribeToPlan(planId) {
            if (planId === 'free') {
                alert('You are already on the Free plan');
                return;
            }
            
            if (confirm('Are you sure you want to upgrade to this plan?')) {
                fetch('/api/user/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        planId: planId
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        alert('Plan upgraded successfully!');
                        location.href = '/app/dashboard/billing';
                    } else {
                        alert('Error: ' + data.err);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred while upgrading your plan');
                });
            }
        }
    </script>
</body>
</html>
  `;
}
