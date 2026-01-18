import { CONFIG } from '../config/index.js';
import { LOGO_SVG } from '../utils/assets.js';

export const LandingPage = () => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${CONFIG.site_name} - Unlock the Power of AI</title><meta name="description" content="${CONFIG.seo.default_description}"><meta name="keywords" content="${CONFIG.seo.default_keywords}"><meta name="author" content="${CONFIG.seo.author}"><meta property="og:title" content="${CONFIG.site_name} - Advanced AI Platform for Developers"><meta property="og:description" content="${CONFIG.seo.default_description}"><meta property="og:type" content="website"><meta property="og:url" content="${CONFIG.site_url}"><meta property="og:site_name" content="${CONFIG.site_name}"><meta property="og:image" content="${CONFIG.site_url}/assets/logo.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${CONFIG.site_name} - Advanced AI Platform"><meta name="twitter:description" content="${CONFIG.seo.default_description}"><meta name="twitter:image" content="${CONFIG.site_url}/assets/logo.png"><link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png"><link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png"><link rel="manifest" href="/assets/site.webmanifest"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"${CONFIG.site_name}","url":"${CONFIG.site_url}","description":"${CONFIG.seo.default_description}","logo":"${CONFIG.site_url}/assets/logo.png"}</script><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${CONFIG.site_name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <a href="/api-docs" class="text-slate-300 hover:text-white transition">API</a>
        <button onclick="showLogin()" class="bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
        <button onclick="showRegister()" class="bg-slate-800 px-6 py-2 rounded-full font-bold hover:bg-slate-700 transition">Get Started</button>
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
        <a href="#features" class="block text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="block text-slate-300 hover:text-white transition">Pricing</a>
        <a href="/api-docs" class="block text-slate-300 hover:text-white transition">API</a>
        <button onclick="showLogin()" class="w-full bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
        <button onclick="showRegister()" class="w-full bg-slate-800 px-6 py-2 rounded-full font-bold hover:bg-slate-700 transition">Get Started</button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-20 px-6">
    <div class="max-w-7xl mx-auto text-center">
      <div class="mb-8">
        <div class="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 text-sm text-slate-300 mb-6">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          AI Gateway Platform - Now Live
        </div>
        <h1 class="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
          Unlock the Power of AI
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Access premium AI models through a single, unified API.
          Pay-as-you-go pricing with transparent costs and enterprise-grade security.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onclick="showRegister()" class="bg-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand/90 transition transform hover:scale-105 shadow-lg shadow-brand/25">
            Start Free Trial
          </button>
          <a href="/api-docs" class="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition transform hover:scale-105 inline-block">
            View Documentation
          </a>
        </div>
      </div>
      
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div class="text-3xl font-black text-brand mb-2">10+</div>
          <div class="text-slate-400">Premium AI Models</div>
        </div>
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div class="text-3xl font-black text-green-400 mb-2">99.9%</div>
          <div class="text-slate-400">Uptime SLA</div>
        </div>
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <div class="text-3xl font-black text-purple-400 mb-2">24/7</div>
          <div class="text-slate-400">API Support</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="py-20 px-6 bg-slate-900/50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">Why Choose ${CONFIG.site_name}?</h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Enterprise-grade AI infrastructure with developer-friendly APIs
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-brand/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand/30 transition">
            <svg class="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Lightning Fast</h3>
          <p class="text-slate-400">Optimized infrastructure with sub-second response times for real-time AI interactions.</p>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Secure & Private</h3>
          <p class="text-slate-400">Enterprise-grade security with end-to-end encryption and GDPR compliance.</p>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Transparent Pricing</h3>
          <p class="text-slate-400">Pay-as-you-go model with no hidden fees. Only pay for what you use.</p>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">OpenAI Compatible</h3>
          <p class="text-slate-400">Drop-in replacement for OpenAI API with minimal code changes required.</p>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/30 transition">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Analytics Dashboard</h3>
          <p class="text-slate-400">Real-time usage analytics and cost tracking to optimize your AI spending.</p>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-brand/50 transition group">
          <div class="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/30 transition">
            <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">Developer First</h3>
          <p class="text-slate-400">Comprehensive documentation, SDKs, and dedicated developer support.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pricing Section -->
  <section id="pricing" class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">Simple, Transparent Pricing</h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. No hidden fees, cancel anytime.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition">
          <h3 class="text-xl font-bold text-white mb-2">Starter</h3>
          <div class="text-3xl font-black text-white mb-4">Rp 50K<span class="text-lg font-normal text-slate-400">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Basic AI Models
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              100K tokens/month
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Email support
            </li>
          </ul>
          <button onclick="showRegister()" class="w-full bg-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">
            Get Started
          </button>
        </div>
        
        <div class="bg-gradient-to-br from-brand/20 to-purple-500/20 backdrop-blur-sm border border-brand/50 rounded-2xl p-8 hover:border-brand transition transform scale-105">
          <div class="bg-brand text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">POPULAR</div>
          <h3 class="text-xl font-bold text-white mb-2">Professional</h3>
          <div class="text-3xl font-black text-white mb-4">Rp 200K<span class="text-lg font-normal text-slate-400">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Advanced AI Models
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              500K tokens/month
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Priority support
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Custom integrations
            </li>
          </ul>
          <button onclick="showRegister()" class="w-full bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">
            Get Started
          </button>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition">
          <h3 class="text-xl font-bold text-white mb-2">Enterprise</h3>
          <div class="text-3xl font-black text-white mb-4">Custom</div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              All AI Models
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Unlimited tokens
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Dedicated support
            </li>
            <li class="flex items-center gap-2 text-slate-300">
              <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              SLA guarantee
            </li>
          </ul>
          <button onclick="contactSales()" class="w-full bg-slate-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- API Section -->
  <section id="api" class="py-20 px-6 bg-slate-900/50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-black mb-4">Simple Integration</h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Get started in minutes with our OpenAI-compatible API
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl font-bold text-white mb-6">Quick Start Example</h3>
          <div class="bg-black/50 border border-slate-700 rounded-2xl p-6 font-mono text-sm">
            <div class="text-slate-400 mb-4"># Install the OpenAI package</div>
            <div class="text-green-400 mb-6">pip install openai</div>
            
            <div class="text-slate-400 mb-4"># Use with our API</div>
            <div class="text-blue-400 mb-2">from openai import OpenAI</div>
            <div class="text-blue-400 mb-2">client = OpenAI(</div>
            <div class="text-blue-400 ml-4">api_key="your-api-key",</div>
            <div class="text-blue-400 ml-4">base_url="${CONFIG.site_url}/v1"</div>
            <div class="text-blue-400">)</div>
            <div class="text-white mt-4">response = client.chat.completions.create(</div>
            <div class="text-white ml-4">model="gpt-4",</div>
            <div class="text-white ml-4">messages=[{"role": "user", "content": "Hello!"}]</div>
            <div class="text-white">)</div>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h4 class="text-lg font-bold text-white mb-3">🚀 Easy Migration</h4>
            <p class="text-slate-400">Switch from OpenAI in minutes - just change the base URL and API key.</p>
          </div>
          
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h4 class="text-lg font-bold text-white mb-3">📚 Comprehensive Docs</h4>
            <p class="text-slate-400">Detailed documentation with examples for all programming languages. <a href="/app" class="text-brand hover:underline">Get API Key →</a></p>
          </div>
          
          <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
            <h4 class="text-lg font-bold text-white mb-3">🔧 SDK Support</h4>
            <p class="text-slate-400">Official SDKs for Python, JavaScript, Go, and more.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="py-20 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <div class="bg-gradient-to-r from-brand/20 to-purple-500/20 backdrop-blur-sm border border-brand/50 rounded-3xl p-12">
        <h2 class="text-4xl font-black mb-4">Ready to Get Started?</h2>
        <p class="text-xl text-slate-300 mb-8">
          Join thousands of developers using ${CONFIG.site_name} to build amazing AI applications.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button onclick="showRegister()" class="bg-brand text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand/90 transition transform hover:scale-105 shadow-lg shadow-brand/25">
            Start Free Trial
          </button>
          <button onclick="showLogin()" class="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition">
            Sign In
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-3 font-bold text-xl text-white mb-4">
            ${LOGO_SVG} ${CONFIG.site_name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>
        
        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="#features" class="hover:text-white transition">Features</a></li>
            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/api-docs" class="hover:text-white transition">API Docs</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold text-white mb-4">Company</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/about" class="hover:text-white transition">About</a></li>
            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-bold text-white mb-4">Legal</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/privacy-policy" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" class="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/security" class="hover:text-white transition">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div class="border-t border-slate-800/50 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2026 ${CONFIG.site_name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
    }
    
    function scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
    
    function showLogin() {
      location.href = '/app';
    }
    
    function showRegister() {
      location.href = '/auth/register';
    }
    
    function contactSales() {
      alert('Please contact our sales team at sales@' + window.location.hostname);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.classList.add('bg-slate-900/95');
        nav.classList.remove('bg-slate-900/80');
      } else {
        nav.classList.add('bg-slate-900/80');
        nav.classList.remove('bg-slate-900/95');
      }
    });
  </script>
</body></html>`;

export const UserApp = (user) => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Dashboard - ${CONFIG.site_name}</title><meta name="description" content="Manage your ${CONFIG.site_name} account, API keys, and usage analytics."><meta name="robots" content="noindex, nofollow"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📊</text></svg>"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-[#020617] text-slate-200 min-h-screen p-8">
  <div class="max-w-6xl mx-auto">
    <div class="flex justify-between items-center mb-16">
      <div class="flex items-center gap-3 font-bold text-2xl text-white">${LOGO_SVG} ${CONFIG.site_name} Dashboard</div>
      <button onclick="logout()" class="text-red-500 text-sm hover:underline">Logout</button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-8">
      <button onclick="showTab('overview')" id="tab-overview" class="px-6 py-3 rounded-xl font-bold bg-brand text-white">Overview</button>
      <button onclick="showTab('packages')" id="tab-packages" class="px-6 py-3 rounded-xl font-bold bg-slate-800 text-slate-400 hover:bg-slate-700">Packages</button>
      <button onclick="showTab('history')" id="tab-history" class="px-6 py-3 rounded-xl font-bold bg-slate-800 text-slate-400 hover:bg-slate-700">Chat History</button>
      <button onclick="showTab('keys')" id="tab-keys" class="px-6 py-3 rounded-xl font-bold bg-slate-800 text-slate-400 hover:bg-slate-700">API Keys</button>
      <button onclick="showTab('account')" id="tab-account" class="px-6 py-3 rounded-xl font-bold bg-slate-800 text-slate-400 hover:bg-slate-700">Account</button>
    </div>

    <!-- Packages Tab -->
    <div id="content-packages" class="tab-content hidden">
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
        <h2 class="text-2xl font-bold text-white mb-6">Unlock Premium Models</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" id="packagesList">
          <!-- Loaded via JS -->
        </div>
      </div>
    </div>

    <!-- Overview Tab -->
    <div id="content-overview" class="tab-content">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-10 text-brand opacity-10 group-hover:opacity-20 transition">${LOGO_SVG}</div>
          <div class="text-slate-500 text-sm mb-2 uppercase tracking-widest font-bold">Total Credits</div>
          <div class="text-5xl font-black text-white">Rp ${user.credits.toLocaleString()}</div>
          <div class="text-sm text-slate-400 mt-2">Total Used: Rp ${user.total_used?.toLocaleString() || 0}</div>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
          <div class="text-slate-500 text-sm mb-4 uppercase tracking-widest font-bold">API Base URL (Cursor/IDE)</div>
          <code class="block bg-black/50 p-4 rounded-2xl text-brand text-xs break-all border border-brand/20">https://ai.jasyscom-corp.workers.dev/v1</code>
        </div>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
        <h2 class="text-2xl font-bold text-white mb-6">Usage Metrics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-black text-blue-400">${Object.keys(user.usage_daily || {}).length}</div>
            <div class="text-sm text-slate-500">Active Days</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-black text-green-400">${user.api_keys?.length || 0}</div>
            <div class="text-sm text-slate-500">API Keys</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-black text-purple-400">${user.unlocked_models?.length || 0}</div>
            <div class="text-sm text-slate-500">Unlocked Models</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat History Tab -->
    <div id="content-history" class="tab-content hidden">
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-2xl font-bold text-white">Chat History</h2>
          <a href="/chat" class="bg-brand px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition">Start New Chat</a>
        </div>
        <div id="chatHistoryList" class="space-y-4">
          <!-- Loaded via JS -->
        </div>
      </div>
    </div>

    <!-- API Keys Tab -->
    <div id="content-keys" class="tab-content hidden">
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
        <div class="flex justify-between items-center mb-10">
          <h2 class="text-2xl font-bold text-white">My API Keys</h2>
          <button onclick="createKey()" class="bg-brand px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition">Create New Key</button>
        </div>
        <div class="space-y-4">
          ${user.api_keys?.map(k => `
            <div class="bg-dark p-6 rounded-3xl border border-slate-800 flex justify-between items-center hover:border-slate-700 transition">
              <div><div class="font-bold text-white text-lg">${k.name}</div><div class="text-xs text-slate-500">${new Date(k.created).toLocaleDateString()}</div></div>
              <div class="flex gap-2">
                <code class="bg-black/50 px-4 py-2 rounded-xl text-blue-400 text-sm border border-slate-800">${k.key}</code>
                <button onclick="deleteKey('${k.key}')" class="text-red-400 hover:text-red-300 px-3 py-1">×</button>
              </div>
            </div>
          `).join('') || '<div class="text-slate-500 text-center py-8">No API keys yet</div>'}
        </div>
      </div>
    </div>

    <!-- Account Tab -->
    <div id="content-account" class="tab-content hidden">
      <div class="bg-slate-900 border border-slate-800 p-10 rounded-[2.5rem]">
        <h2 class="text-2xl font-bold text-white mb-6">Account Settings</h2>
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-slate-400 mb-2">Name</label>
            <input id="accountName" class="w-full bg-dark border border-slate-800 p-4 rounded-2xl text-white" value="${user.name}">
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-400 mb-2">Email</label>
            <input id="accountEmail" class="w-full bg-dark border border-slate-800 p-4 rounded-2xl text-white" value="${user.email}" disabled>
          </div>
          <div>
            <label class="block text-sm font-bold text-slate-400 mb-2">Change Password</label>
            <input id="accountPass" type="password" class="w-full bg-dark border border-slate-800 p-4 rounded-2xl text-white" placeholder="New password (leave empty to keep current)">
          </div>
          <button onclick="updateAccount()" class="bg-brand px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition">Update Account</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    function showTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('[id^=tab-]').forEach(el => {
        el.classList.remove('bg-brand', 'text-white');
        el.classList.add('bg-slate-800', 'text-slate-400');
      });
      document.getElementById('content-' + tab).classList.remove('hidden');
      document.getElementById('tab-' + tab).classList.add('bg-brand', 'text-white');
      document.getElementById('tab-' + tab).classList.remove('bg-slate-800', 'text-slate-400');

      if (tab === 'history') loadChatHistory();
      if (tab === 'packages') loadPackages();
    }

    async function loadChatHistory() {
      const res = await fetch('/api/user/history', { headers: { 'Authorization': localStorage.getItem('t') } });
      if (res.ok) {
        const history = await res.json();
        const list = document.getElementById('chatHistoryList');
        list.innerHTML = history.map(h => \`
          <div class="bg-dark p-6 rounded-3xl border border-slate-800 hover:border-slate-700 transition cursor-pointer" onclick="location.href='/chat'">
            <div class="font-bold text-white text-lg">\${h.title || 'Untitled Chat'}</div>
            <div class="text-xs text-slate-500">\${new Date(h.date).toLocaleString()}</div>
          </div>
        \`).join('') || '<div class="text-slate-500 text-center py-8">No chat history yet</div>';
      }
    }

    async function createKey() {
      const name = prompt("Key Label:"); if(!name) return;
      const res = await fetch('/api/user/keys', {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('t'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        alert('API key created successfully!');
        location.reload();
      } else {
        alert('Failed to create API key');
      }
    }

    async function deleteKey(key) {
      if (!confirm('Delete this API key?')) return;
      const res = await fetch('/api/user/keys', {
        method: 'DELETE',
        headers: { 'Authorization': localStorage.getItem('t'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ key })
      });
      if (res.ok) {
        alert('API key deleted successfully!');
        location.reload();
      } else {
        alert('Failed to delete API key');
      }
    }

    async function loadPackages() {
      const packages = ${JSON.stringify(CONFIG.packages)};
      const unlocked = ${JSON.stringify(user.unlocked_models || [])};
      const list = document.getElementById('packagesList');
      list.innerHTML = packages.map(pkg => {
        const isUnlocked = unlocked.some(m => pkg.unlocks.includes(m));
        return \`
          <div class="bg-dark p-6 rounded-3xl border border-slate-800 \${isUnlocked ? 'border-green-500' : ''}">
            <div class="text-xl font-bold text-white mb-2">\${pkg.name}</div>
            <div class="text-3xl font-black text-brand mb-4">Rp \${pkg.price.toLocaleString()}</div>
            <div class="text-sm text-slate-400 mb-4">
              Unlocks: \${pkg.unlocks.join(', ')}
            </div>
            \${isUnlocked ?
              '<div class="text-green-400 font-bold">✓ Unlocked</div>' :
              \`<button onclick="purchasePackage('\${pkg.id}')" class="w-full bg-brand py-3 rounded-xl font-bold hover:scale-105 transition">Purchase</button>\`
            }
          </div>
        \`;
      }).join('');
    }

    async function purchasePackage(packageId) {
      if (!confirm('Purchase this package?')) return;
      const res = await fetch('/api/user/package/purchase', {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('t'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId })
      });
      const data = await res.json();
      if (data.ok) {
        alert('Package purchased successfully!');
        location.reload();
      } else {
        alert(data.err || 'Purchase failed');
      }
    }

    async function updateAccount() {
      const name = document.getElementById('accountName').value;
      const pass = document.getElementById('accountPass').value;
      const res = await fetch('/api/user/account/update', {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('t'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, pass: pass || undefined })
      });
      if (res.ok) {
        alert('Account updated successfully!');
        location.reload();
      } else {
        alert('Failed to update account');
      }
    }

    function logout() {
      localStorage.clear();
      location.href = '/app';
    }

    // Default to overview
    showTab('overview');
  </script>
</body></html>`;

export const AdminApp = (data) => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Gateway - ${CONFIG.site_name}</title><meta name="description" content="Admin dashboard for ${CONFIG.site_name} management and analytics."><meta name="robots" content="noindex, nofollow"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚙️</text></svg>"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-black text-slate-300 p-10">
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-12">
      <h1 class="text-4xl font-black text-white tracking-tighter italic">ADMIN <span class="text-brand">GATEWAY</span></h1>
      <button onclick="logout()" class="text-red-500 text-sm hover:underline">Logout</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800"><div class="text-slate-500 text-xs font-bold mb-1 uppercase tracking-widest">Users</div><div class="text-4xl font-black text-white">${data.userCount}</div></div>
      <div class="bg-slate-900 p-8 rounded-3xl border border-slate-800 col-span-3">
        <div class="text-slate-500 text-xs font-bold mb-3 uppercase tracking-widest">OpenRouter Provider Key</div>
        <div class="flex gap-4">
          <input id="okey" class="flex-1 bg-black border border-slate-800 p-3 rounded-xl text-xs font-mono" value="${data.settings.openrouter_key || ''}">
          <button onclick="saveSet()" class="bg-blue-600 px-10 rounded-xl font-bold hover:bg-blue-500">Save</button>
        </div>
      </div>
    </div>
    <div class="bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
      <table class="w-full text-left text-xs font-mono">
        <thead class="bg-slate-800/50 text-slate-500 border-b border-slate-800">
          <tr><th class="p-5">Time</th><th class="p-5">User</th><th class="p-5">Model</th><th class="p-5">Tokens</th><th class="p-5">Profit (IDR)</th></tr>
        </thead>
        <tbody class="divide-y divide-slate-800">
          ${data.logs.map(l => `<tr><td class="p-5 text-slate-500">${l.time.slice(11,19)}</td><td class="p-5 font-bold text-white">${l.email}</td><td class="p-5 text-blue-500">${l.model}</td><td class="p-5">${l.tokens}</td><td class="p-5 text-green-400">Rp ${l.cost.toLocaleString()}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  <script>
    async function saveSet() {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Authorization': localStorage.getItem('adm_t'), 'Content-Type': 'application/json' },
        body: JSON.stringify({ openrouter_key: document.getElementById('okey').value })
      });
      if (res.ok) {
        alert('Settings updated successfully!');
      } else {
        alert('Failed to update settings');
      }
    }

    function logout() {
      localStorage.clear();
      location.href = '/admin';
    }
  </script>
</body></html>`;

// Login/Register Pages
export const LoginPage = () => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sign In - ${CONFIG.site_name}</title><meta name="description" content="Sign in to your ${CONFIG.site_name} account to access AI models and manage your usage."><meta name="keywords" content="${CONFIG.seo.default_keywords}"><meta name="author" content="${CONFIG.seo.author}"><meta property="og:title" content="Sign In - ${CONFIG.site_name}"><meta property="og:description" content="Sign in to your ${CONFIG.site_name} account to access AI models and manage your usage."><meta property="og:type" content="website"><meta property="og:url" content="${CONFIG.site_url}/app"><meta property="og:site_name" content="${CONFIG.site_name}"><meta property="og:image" content="${CONFIG.site_url}/assets/logo.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Sign In - ${CONFIG.site_name}"><meta name="twitter:description" content="Sign in to your ${CONFIG.site_name} account to access AI models and manage your usage."><meta name="twitter:image" content="${CONFIG.site_url}/assets/logo.png"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen grid grid-rows-[auto_1fr_auto]">
  <!-- Navigation -->
  <nav class="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${CONFIG.site_name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="/" class="text-slate-300 hover:text-white transition">Home</a>
        <a href="/#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="/#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <button onclick="showRegister()" class="bg-slate-800 px-6 py-2 rounded-full font-bold hover:bg-slate-700 transition">Get Started</button>
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
        <a href="/" class="block text-slate-300 hover:text-white transition">Home</a>
        <a href="/#features" class="block text-slate-300 hover:text-white transition">Features</a>
        <a href="/#pricing" class="block text-slate-300 hover:text-white transition">Pricing</a>
        <button onclick="showRegister()" class="w-full bg-slate-800 px-6 py-2 rounded-full font-bold hover:bg-slate-700 transition">Get Started</button>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="px-6 flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="text-3xl font-black text-white mb-2">${CONFIG.site_name}</div>
        <div class="text-slate-400 text-sm">Sign in to your account</div>
      </div>

    <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
      <form id="loginForm" onsubmit="handleLogin(event)">
        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-400 mb-2">Email</label>
          <input type="email" id="email" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="your@email.com">
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-400 mb-2">Password</label>
          <input type="password" id="password" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="••••••••">
        </div>

        <button type="submit" id="loginBtn" class="w-full bg-brand text-white p-4 rounded-xl font-bold hover:bg-brand/90 transition disabled:opacity-50">
          Sign In
        </button>

        <div class="text-center mt-6">
          <span class="text-slate-500 text-sm">Don't have an account? </span>
          <button type="button" onclick="showRegister()" class="text-brand text-sm hover:underline">Sign up</button>
        </div>
      </form>
    </div>

  </div>
  </main>

  <!-- Footer -->
  <footer class="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-3 font-bold text-xl text-white mb-4">
            ${LOGO_SVG} ${CONFIG.site_name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="#features" class="hover:text-white transition">Features</a></li>
            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/api-docs" class="hover:text-white transition">API Docs</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Company</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/about" class="hover:text-white transition">About</a></li>
            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Legal</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/privacy-policy" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" class="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/security" class="hover:text-white transition">Security</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2026 ${CONFIG.site_name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    async function handleLogin(event) {
      event.preventDefault();
      const btn = document.getElementById('loginBtn');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      btn.disabled = true;
      btn.textContent = 'Signing in...';

      try {
        const response = await fetch('/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, pass: password })
        });

        const data = await response.json();

        if (data.ok) {
          localStorage.setItem('t', data.token);
          localStorage.setItem('role', data.role);
          location.href = '/app';
        } else {
          alert(data.err || 'Login failed');
        }
      } catch (error) {
        alert('Connection error. Please try again.');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Sign In';
      }
    }

    function showRegister() {
      location.href = '/auth/register';
    }
  </script>
</body></html>`;

export const RegisterPage = () => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sign Up - ${CONFIG.site_name}</title><meta name="description" content="Create your ${CONFIG.site_name} account to access AI models and start building amazing applications."><meta name="keywords" content="${CONFIG.seo.default_keywords}"><meta name="author" content="${CONFIG.seo.author}"><meta property="og:title" content="Sign Up - ${CONFIG.site_name}"><meta property="og:description" content="Create your ${CONFIG.site_name} account to access AI models and start building amazing applications."><meta property="og:type" content="website"><meta property="og:url" content="${CONFIG.site_url}/auth/register"><meta property="og:site_name" content="${CONFIG.site_name}"><meta property="og:image" content="${CONFIG.site_url}/assets/logo.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Sign Up - ${CONFIG.site_name}"><meta name="twitter:description" content="Create your ${CONFIG.site_name} account to access AI models and start building amazing applications."><meta name="twitter:image" content="${CONFIG.site_url}/assets/logo.png"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen grid grid-rows-[auto_1fr_auto]">
  <!-- Navigation -->
  <nav class="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${CONFIG.site_name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="/" class="text-slate-300 hover:text-white transition">Home</a>
        <a href="/#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="/#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <button onclick="showLogin()" class="bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
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
        <a href="/" class="block text-slate-300 hover:text-white transition">Home</a>
        <a href="/#features" class="block text-slate-300 hover:text-white transition">Features</a>
        <a href="/#pricing" class="block text-slate-300 hover:text-white transition">Pricing</a>
        <button onclick="showLogin()" class="w-full bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main class="px-6 flex items-center justify-center">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="text-3xl font-black text-white mb-2">${CONFIG.site_name}</div>
        <div class="text-slate-400 text-sm">Create your account</div>
      </div>

    <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
      <form id="registerForm" onsubmit="handleRegister(event)">
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
          <input type="text" id="name" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="John Doe">
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-400 mb-2">Email</label>
          <input type="email" id="email" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="your@email.com">
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-400 mb-2">Password</label>
          <input type="password" id="password" required minlength="6" class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="••••••••">
        </div>

        <button type="submit" id="registerBtn" class="w-full bg-brand text-white p-4 rounded-xl font-bold hover:bg-brand/90 transition disabled:opacity-50">
          Create Account
        </button>

        <div class="text-center mt-6">
          <span class="text-slate-500 text-sm">Already have an account? </span>
          <button type="button" onclick="showLogin()" class="text-brand text-sm hover:underline">Sign in</button>
        </div>
      </form>
    </div>

  </div>
  </main>

  <!-- Footer -->
  <footer class="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-3 font-bold text-xl text-white mb-4">
            ${LOGO_SVG} ${CONFIG.site_name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="#features" class="hover:text-white transition">Features</a></li>
            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/api-docs" class="hover:text-white transition">API Docs</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Company</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/about" class="hover:text-white transition">About</a></li>
            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Legal</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/privacy-policy" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" class="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/security" class="hover:text-white transition">Security</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2026 ${CONFIG.site_name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    async function handleRegister(event) {
      event.preventDefault();
      const btn = document.getElementById('registerBtn');
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      btn.disabled = true;
      btn.textContent = 'Creating account...';

      try {
        const response = await fetch('/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, pass: password })
        });

        const data = await response.json();

        if (data.ok) {
          alert('Account created successfully! Please sign in.');
          showLogin();
        } else {
          alert(data.err || 'Registration failed');
        }
      } catch (error) {
        alert('Connection error. Please try again.');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Create Account';
      }
    }

    function showLogin() {
      location.href = '/app';
    }
  </script>
</body></html>`;

export const AdminLoginPage = () => `
<!DOCTYPE html><html lang="en" class="dark"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Portal - ${CONFIG.site_name}</title><meta name="description" content="Admin portal for ${CONFIG.site_name} management."><meta name="robots" content="noindex, nofollow"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔧</text></svg>"><meta name="theme-color" content="${CONFIG.seo.theme_color}"><script src="https://cdn.tailwindcss.com"></script></head>
<body class="bg-black text-slate-300 min-h-screen flex items-center justify-center p-6">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="text-3xl font-black text-white mb-2">Admin Portal</div>
      <div class="text-slate-500 text-sm">${CONFIG.site_name}</div>
    </div>
    
    <div class="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
      <form id="adminLoginForm" onsubmit="handleAdminLogin(event)">
        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-400 mb-2">Username</label>
          <input type="text" id="username" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="admin">
        </div>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-slate-400 mb-2">Password</label>
          <input type="password" id="password" required class="w-full bg-slate-800 border border-slate-700 p-4 rounded-xl text-white focus:border-brand focus:outline-none transition" placeholder="••••••••">
        </div>
        
        <button type="submit" id="loginBtn" class="w-full bg-brand text-white p-4 rounded-xl font-bold hover:bg-brand/90 transition disabled:opacity-50">
          Sign In
        </button>
        
        <div class="text-center mt-6">
          <a href="/app" class="text-slate-500 text-sm hover:text-slate-400 transition">← User Portal</a>
        </div>
      </form>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-3 font-bold text-xl text-white mb-4">
            ${LOGO_SVG} ${CONFIG.site_name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="#features" class="hover:text-white transition">Features</a></li>
            <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/api-docs" class="hover:text-white transition">API Docs</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Company</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/about" class="hover:text-white transition">About</a></li>
            <li><a href="/blog" class="hover:text-white transition">Blog</a></li>
            <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-white mb-4">Legal</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/privacy-policy" class="hover:text-white transition">Privacy Policy</a></li>
            <li><a href="/terms-of-service" class="hover:text-white transition">Terms of Service</a></li>
            <li><a href="/security" class="hover:text-white transition">Security</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-slate-800/50 pt-8 text-center text-slate-400 text-sm">
        <p>&copy; 2026 ${CONFIG.site_name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    async function handleAdminLogin(event) {
      event.preventDefault();
      const btn = document.getElementById('loginBtn');
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      btn.disabled = true;
      btn.textContent = 'Signing in...';

      try {
        const response = await fetch('/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: username, pass: password })
        });

        const data = await response.json();

        if (data.ok) {
          localStorage.setItem('adm_t', data.token);
          localStorage.setItem('role', data.role);
          location.href = '/admin';
        } else {
          alert(data.err || 'Login failed');
        }
      } catch (error) {
        alert('Connection error. Please try again.');
      } finally {
        btn.disabled = false;
        btn.textContent = 'Sign In';
      }
    }
  </script>
</body></html>`;