import { ConfigService } from '../config/config.service.js';
import { LOGO_SVG } from './assets.js';
import { ContentModel } from '../models/index.js';
import { getCurrentUrl } from './helpers.js';

export async function ContentPage(request, env, pageKey) {
  // Load settings from KV store
  let simpleSettings = null;
  try {
    const settings = await DB.get(env, 'sys_settings');
    simpleSettings = {
      company: {
        name: settings?.company?.name || 'JasyAI',
        support_email: settings?.company?.support_email || 'support@jasyai.com',
        technical_support: settings?.company?.technical_support || 'technical@jasyai.com',
        response_time: settings?.company?.response_time || 'Within 24 hours',
        support_hours: settings?.company?.support_hours || 'Monday - Friday, 9 AM - 6 PM UTC'
      },
      site_url: 'https://ai.jasyscom.workers.dev'
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    simpleSettings = {
      company: {
        name: 'JasyAI',
        support_email: 'support@jasyai.com',
        technical_support: 'technical@jasyai.com',
        response_time: 'Within 24 hours',
        support_hours: 'Monday - Friday, 9 AM - 6 PM UTC'
      },
      site_url: 'https://ai.jasyscom.workers.dev'
    };
  }
  
  const pageConfig = {
    about: { title: 'About Us', description: 'Learn more about our company and mission' },
    blog: { title: 'Blog', description: 'Latest news and updates from our team' },
    contact: { title: 'Contact Us', description: 'Get in touch with our team' },
    privacy_policy: { title: 'Privacy Policy', description: 'How we collect, use, and protect your data' },
    terms_of_service: { title: 'Terms of Service', description: 'Terms and conditions for using our service' },
    security: { title: 'Security', description: 'Security measures and best practices' }
  };

  const config = pageConfig[pageKey] || { title: 'Content', description: '' };
  const currentUrl = getCurrentUrl(request);
  
  return `
<!DOCTYPE html><html lang="en" class="dark"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} - ${simpleSettings.company.name}</title>
  <meta name="description" content="${config.description}">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${simpleSettings.company.name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="/" class="text-slate-300 hover:text-white transition">Home</a>
        <a href="#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <a href="#api" class="text-slate-300 hover:text-white transition">API</a>
        <button onclick="showLogin()" class="bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
      </div>
      <button onclick="toggleMobileMenu()" class="md:hidden text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Content Section -->
  <section class="pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-black mb-4">${config.title}</h1>
        <p class="text-xl text-slate-300">${config.description}</p>
      </div>
      
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
        <div class="text-slate-300">
          <h2 class="text-2xl font-bold mb-4">${config.title}</h2>
          <p class="mb-4">This is a simplified version of the ${config.title.toLowerCase()} page.</p>
          <p class="mb-4">This page is currently under development and will be updated with more content soon.</p>
          
          ${pageKey === 'contact' ? `
            <div class="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 class="text-xl font-bold mb-4">Contact Information</h3>
                <div class="space-y-3">
                  <p><strong>Email:</strong> ${simpleSettings.company.support_email}</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                  <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM UTC</p>
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold mb-4">Send us a Message</h3>
                <form id="contactForm" class="space-y-4">
                  <div>
                    <label for="name" class="block text-sm font-medium text-slate-300 mb-2">Your Name</label>
                    <input type="text" id="name" name="name" required
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Enter your name">
                  </div>
                  
                  <div>
                    <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Your Email</label>
                    <input type="email" id="email" name="email" required
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Enter your email">
                  </div>
                  
                  <div>
                    <label for="subject" class="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" required
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Enter subject">
                  </div>
                  
                  <div>
                    <label for="message" class="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <textarea id="message" name="message" required rows="4"
                      class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                      placeholder="Enter your message"></textarea>
                  </div>
                  
                  <button type="submit"
                    class="w-full bg-brand hover:bg-brand/90 text-white font-bold py-3 px-6 rounded-lg transition duration-200">
                    Send Message
                  </button>
                </form>
                
                <div id="formMessage" class="mt-4 text-sm font-medium hidden"></div>
              </div>
            </div>
            
            <script>
              document.getElementById('contactForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                
                const messageDiv = document.getElementById('formMessage');
                messageDiv.classList.remove('hidden', 'text-green-400', 'text-red-400');
                messageDiv.textContent = 'Sending your message...';
                messageDiv.classList.add('text-yellow-400');
                
                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  });
                  
                  if (response.ok) {
                    messageDiv.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
                    messageDiv.classList.remove('text-yellow-400');
                    messageDiv.classList.add('text-green-400');
                    e.target.reset();
                  } else {
                    const errorData = await response.json();
                    messageDiv.textContent = 'Error: ' + (errorData.error || 'Failed to send message');
                    messageDiv.classList.remove('text-yellow-400');
                    messageDiv.classList.add('text-red-400');
                  }
                } catch (error) {
                  messageDiv.textContent = 'Error: Failed to send message';
                  messageDiv.classList.remove('text-yellow-400');
                  messageDiv.classList.add('text-red-400');
                }
              });
            </script>
          ` : ''}
        </div>
      </div>
      
      <div class="text-center mt-8">
        <a href="/" class="inline-flex items-center gap-2 text-brand hover:text-brand/80 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 py-12 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center gap-3 font-bold text-xl text-white mb-4">
            ${LOGO_SVG} ${simpleSettings.company.name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>
        
        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/#features" class="hover:text-white transition">Features</a></li>
            <li><a href="/#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/#api" class="hover:text-white transition">API Docs</a></li>
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
        <p>&copy; 2026 ${simpleSettings.company.name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
    }

    function showLogin() {
      location.href = '/app';
    }
  </script>
</body></html>`;
}

function getDefaultContent(pageKey, settings) {
  const defaultContent = {
    about: `
      <h2 class="text-2xl font-bold mb-4">About ${settings.company.name}</h2>
      <p class="mb-4">${settings.company.name} is a leading AI platform that provides access to powerful language models through a simple, transparent API. Our mission is to make AI accessible to everyone while maintaining the highest standards of privacy and security.</p>
      <h3 class="text-xl font-bold mb-3">Our Vision</h3>
      <p class="mb-4">We believe in democratizing AI technology, allowing developers, businesses, and individuals to harness the power of advanced language models without the complexity and high costs typically associated with AI infrastructure.</p>
      <h3 class="text-xl font-bold mb-3">Why Choose Us?</h3>
      <ul class="list-disc list-inside space-y-2">
        <li>Simple, transparent pricing with no hidden fees</li>
        <li>Access to cutting-edge AI models</li>
        <li>Robust security and privacy protections</li>
        <li>Developer-friendly API and documentation</li>
        <li>Reliable, scalable infrastructure</li>
      </ul>
    `,
    blog: `
      <h2 class="text-2xl font-bold mb-4">Latest Updates</h2>
      <p class="mb-4">Welcome to the ${settings.company.name} blog! Here you'll find the latest news, updates, and insights about our platform and the world of AI.</p>
      <div class="space-y-6">
        <article class="border-l-4 border-brand pl-4">
          <h3 class="text-xl font-bold mb-2">Platform Launch</h3>
          <p class="text-slate-400 mb-2">Published on ${new Date().toLocaleDateString()}</p>
          <p>We're excited to announce the official launch of ${settings.company.name}! Our platform is now live and ready to help you integrate powerful AI capabilities into your applications.</p>
        </article>
        <article class="border-l-4 border-brand pl-4">
          <h3 class="text-xl font-bold mb-2">New AI Models Available</h3>
          <p class="text-slate-400 mb-2">Coming Soon</p>
          <p>We're constantly expanding our model offerings. Stay tuned for announcements about new AI models joining our platform.</p>
        </article>
      </div>
    `,
    contact: `
      <h2 class="text-2xl font-bold mb-4">Get in Touch</h2>
      <p class="mb-6">We'd love to hear from you! Whether you have questions, feedback, or need support, our team is here to help.</p>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">Contact Information</h3>
          <div class="space-y-3">
            <p><strong>Email:</strong> ${settings.company.support_email}</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
            <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM UTC</p>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Send us a Message</h3>
          <p>For technical support, please include your API key and a detailed description of your issue. For general inquiries, we'll get back to you as soon as possible.</p>
        </div>
      </div>
    `,
    privacy_policy: `
      <h2 class="text-2xl font-bold mb-4">Privacy Policy</h2>
      <p class="mb-4"><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
      <p class="mb-4">At ${settings.company.name}, we take your privacy seriously. This policy explains how we collect, use, and protect your information.</p>
      
      <h3 class="text-xl font-bold mb-3">Information We Collect</h3>
      <p class="mb-4">We collect information necessary to provide our services, including:</p>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Account information (email, name)</li>
        <li>Usage data and API requests</li>
        <li>Payment information (processed securely)</li>
        <li>Communication preferences</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3">How We Use Your Information</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>To provide and maintain our service</li>
        <li>To process payments and manage your account</li>
        <li>To improve our platform and user experience</li>
        <li>To communicate with you about service updates</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3">Data Protection</h3>
      <p class="mb-4">We implement industry-standard security measures to protect your data, including encryption, secure authentication, and regular security audits.</p>
      
      <h3 class="text-xl font-bold mb-3">Your Rights</h3>
      <p class="mb-4">You have the right to access, update, or delete your personal information at any time through your account settings or by contacting our support team.</p>
    `,
    terms_of_service: `
      <h2 class="text-2xl font-bold mb-4">Terms of Service</h2>
      <p class="mb-4"><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
      <p class="mb-4">These terms govern your use of ${settings.company.name}'s services and platform.</p>
      
      <h3 class="text-xl font-bold mb-3">Service Agreement</h3>
      <p class="mb-4">By using ${settings.company.name}, you agree to these terms and our privacy policy. If you disagree, please do not use our service.</p>
      
      <h3 class="text-xl font-bold mb-3">Acceptable Use</h3>
      <p class="mb-4">You agree to use our service responsibly and in compliance with all applicable laws. Prohibited uses include:</p>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Generating illegal, harmful, or malicious content</li>
        <li>Violating intellectual property rights</li>
        <li>Attempting to circumvent security measures</li>
        <li>Using the service for spam or fraud</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3">Payment and Billing</h3>
      <p class="mb-4">Our service operates on a pay-as-you-go basis. You agree to pay all charges incurred under your account. Prices are subject to change with notice.</p>
      
      <h3 class="text-xl font-bold mb-3">Service Availability</h3>
      <p class="mb-4">We strive to maintain high availability but cannot guarantee uninterrupted service. We may perform maintenance that temporarily affects availability.</p>
      
      <h3 class="text-xl font-bold mb-3">Limitation of Liability</h3>
      <p class="mb-4">Our service is provided "as is" without warranties. We are not liable for indirect, incidental, or consequential damages arising from your use of our service.</p>
      
      <h3 class="text-xl font-bold mb-3">Termination</h3>
      <p class="mb-4">We may suspend or terminate your account for violation of these terms or at our discretion with reasonable notice.</p>
    `,
    security: `
      <h2 class="text-2xl font-bold mb-4">Security</h2>
      <p class="mb-4">Security is a top priority at ${settings.company.name}. We implement comprehensive measures to protect your data and ensure service reliability.</p>
      
      <h3 class="text-xl font-bold mb-3">Our Security Measures</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
        <li><strong>Authentication:</strong> Secure API key management and multi-factor authentication options</li>
        <li><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</li>
        <li><strong>Compliance:</strong> Regular security audits and compliance with industry standards</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3">Best Practices for Users</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Keep your API keys secure and never share them publicly</li>
        <li>Use strong, unique passwords for your account</li>
        <li>Regularly rotate your API keys</li>
        <li>Monitor your usage for unusual activity</li>
      </ul>
      
      <h3 class="text-xl font-bold mb-3">Reporting Security Issues</h3>
      <p class="mb-4">If you discover a security vulnerability, please report it immediately to ${settings.company.technical_support}. We'll investigate and address all reports promptly.</p>
      
      <h3 class="text-xl font-bold mb-3">Data Protection</h3>
      <p class="mb-4">We never store your API requests or responses longer than necessary for service operation. All personal data is handled in accordance with our privacy policy and applicable regulations.</p>
    `
  };
  
  return defaultContent[pageKey] || '<p>Content is being updated. Please check back soon.</p>';
}

function getErrorPage(pageKey, errorMessage, currentUrl, settings) {
  const pageTitles = {
    about: 'About Us',
    blog: 'Blog',
    contact: 'Contact Us',
    privacy_policy: 'Privacy Policy',
    terms_of_service: 'Terms of Service',
    security: 'Security'
  };

  const title = pageTitles[pageKey] || 'Page';
  
  return `
<!DOCTYPE html><html lang="en" class="dark"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${title} page temporarily unavailable on ${settings.company.name}. We're working to resolve the issue.">
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${settings.company.name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="/" class="text-slate-300 hover:text-white transition">Home</a>
        <a href="#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <a href="#api" class="text-slate-300 hover:text-white transition">API</a>
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
        <a href="#features" class="block text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="block text-slate-300 hover:text-white transition">Pricing</a>
        <a href="#api" class="block text-slate-300 hover:text-white transition">API</a>
        <button onclick="showLogin()" class="w-full bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
      </div>
    </div>
  </nav>

  <!-- Error Content -->
  <section class="pt-32 pb-20 px-6">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-black mb-4">${title}</h1>
        <p class="text-xl text-slate-300">We're having trouble loading this page</p>
      </div>
      
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 text-center">
        <div class="mb-6">
          <svg class="w-16 h-16 mx-auto text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-white mb-4">Page Temporarily Unavailable</h2>
        <p class="text-slate-300 mb-8">
          We're sorry, but we're experiencing technical difficulties with this page.
          Our team has been notified and is working to resolve the issue.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/" class="inline-flex items-center justify-center gap-2 bg-brand px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            Back to Home
          </a>
          <button onclick="location.reload()" class="inline-flex items-center justify-center gap-2 bg-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Try Again
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
            ${LOGO_SVG} ${settings.company.name}
          </div>
          <p class="text-slate-400 text-sm">
            Your gateway to powerful AI models with simple, transparent pricing.
          </p>
        </div>
        
        <div>
          <h4 class="font-bold text-white mb-4">Product</h4>
          <ul class="space-y-2 text-slate-400 text-sm">
            <li><a href="/#features" class="hover:text-white transition">Features</a></li>
            <li><a href="/#pricing" class="hover:text-white transition">Pricing</a></li>
            <li><a href="/#api" class="hover:text-white transition">API Docs</a></li>
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
        <p>&copy; 2026 ${settings.company.name}. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script>
    function toggleMobileMenu() {
      const menu = document.getElementById('mobileMenu');
      menu.classList.toggle('hidden');
    }

    function showLogin() {
      location.href = '/app';
    }
  </script>
</body></html>`;
}

function getSEOMeta(pageKey, content, config, currentUrl, settings) {
  const pageUrls = {
    about: '',
    blog: '/blog',
    contact: '/contact',
    privacy_policy: '/privacy-policy',
    terms_of_service: '/terms-of-service',
    security: '/security'
  };
  
  const seoData = {
    about: {
      title: `About ${settings.company.name} - AI Platform for Developers`,
      description: `Learn more about ${settings.company.name}, a leading AI platform providing access to powerful language models through simple, transparent APIs. Our mission is to democratize AI technology.`,
      keywords: `AI platform, artificial intelligence, language models, API, developers, machine learning, ${settings.company.name.toLowerCase()}`
    },
    blog: {
      title: `${settings.company.name} Blog - Latest AI Updates and News`,
      description: `Stay updated with the latest news, updates, and insights about ${settings.company.name} and the world of artificial intelligence and machine learning.`,
      keywords: `AI blog, artificial intelligence news, machine learning updates, ${settings.company.name.toLowerCase()}, tech blog`
    },
    contact: {
      title: `Contact ${settings.company.name} - Support and Inquiries`,
      description: `Get in touch with the ${settings.company.name} team for support, questions, or inquiries. We're here to help you succeed with our AI platform.`,
      keywords: `contact support, AI help, customer service, ${settings.company.name.toLowerCase()}, technical support`
    },
    privacy_policy: {
      title: `Privacy Policy - ${settings.company.name}`,
      description: `Read ${settings.company.name}'s comprehensive privacy policy to understand how we collect, use, and protect your data and privacy.`,
      keywords: `privacy policy, data protection, GDPR, user privacy, ${settings.company.name.toLowerCase()}`
    },
    terms_of_service: {
      title: `Terms of Service - ${settings.company.name}`,
      description: `Review ${settings.company.name}'s terms of service and conditions for using our AI platform and API services.`,
      keywords: `terms of service, legal terms, service agreement, ${settings.company.name.toLowerCase()}, user agreement`
    },
    security: {
      title: `Security - ${settings.company.name}`,
      description: `Learn about ${settings.company.name}'s comprehensive security measures, data protection, and best practices for keeping your AI applications secure.`,
      keywords: `security, data protection, cybersecurity, AI security, ${settings.company.name.toLowerCase()}`
    }
  };
  
  const seo = seoData[pageKey] || {
    title: `${config.title} - ${settings.company.name}`,
    description: config.description,
    keywords: `${settings.company.name.toLowerCase()}, AI platform, artificial intelligence`
  };
  
  // Structured data for SEO
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": pageKey === 'about' ? "Organization" : "WebPage",
    "name": settings.company.name,
    "url": currentUrl + (pageUrls[pageKey] || ''),
    "description": seo.description,
    "logo": `${currentUrl}/assets/logo.png`,
    "sameAs": [
      // Add social media URLs if available
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": settings.company.support_email
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${currentUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });
  
  return {
    ...seo,
    structuredData: structuredData
  };
}