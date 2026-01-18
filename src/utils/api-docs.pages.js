import { CONFIG } from '../config/index.js';
import { LOGO_SVG } from './assets.js';

export function ApiDocsPage() {
  return `
<!DOCTYPE html><html lang="en" class="dark"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation - ${CONFIG.site_name}</title>
  <meta name="description" content="JasysAI API Documentation - Complete guide for integrating with our OpenAI-compatible API. Includes examples, SDKs, and best practices.">
  <meta name="keywords" content="JasysAI API, OpenAI compatible, AI API documentation, chat completions, API integration, developer guide">
  <meta name="author" content="${CONFIG.site_name}">
  <meta property="og:title" content="API Documentation - ${CONFIG.site_name}">
  <meta property="og:description" content="Complete API documentation for JasysAI with examples, SDKs, and integration guides">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${CONFIG.site_url}/api-docs">
  <meta property="og:site_name" content="${CONFIG.site_name}">
  <meta property="og:image" content="${CONFIG.site_url}/assets/logo.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="API Documentation - ${CONFIG.site_name}">
  <meta name="twitter:description" content="Complete API documentation for JasysAI with examples and SDKs">
  <meta name="twitter:image" content="${CONFIG.site_url}/assets/logo.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="manifest" href="/assets/site.webmanifest">
  <meta name="theme-color" content="#7c3aed">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen">
  <!-- Navigation -->
  <nav class="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center gap-3 font-bold text-2xl">
        ${LOGO_SVG} ${CONFIG.site_name}
      </div>
      <div class="hidden md:flex items-center gap-6">
        <a href="/" class="text-slate-300 hover:text-white transition">Home</a>
        <a href="#features" class="text-slate-300 hover:text-white transition">Features</a>
        <a href="#pricing" class="text-slate-300 hover:text-white transition">Pricing</a>
        <a href="/api-docs" class="text-brand font-bold">API Docs</a>
        <button onclick="showLogin()" class="bg-brand px-6 py-2 rounded-full font-bold hover:bg-brand/90 transition">Sign In</button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="pt-32 pb-12 px-6">
    <div class="max-w-4xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        API Documentation
      </h1>
      <p class="text-xl text-slate-300 mb-8">
        Complete guide for integrating with our OpenAI-compatible API
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <button onclick="scrollToSection('quick-start')" class="bg-brand px-6 py-3 rounded-xl font-bold hover:bg-brand/90 transition">
          Quick Start
        </button>
        <button onclick="scrollToSection('api-reference')" class="bg-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-600 transition">
          API Reference
        </button>
        <button onclick="openApiTester()" class="bg-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition">
          Try API Now
        </button>
      </div>
    </div>
  </section>

  <!-- Quick Start Section -->
  <section id="quick-start" class="py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">Quick Start</h2>
      
      <div class="grid md:grid-cols-2 gap-8 mb-12">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 class="text-xl font-bold mb-4 text-blue-400">1. Get Your API Key</h3>
          <p class="text-slate-300 mb-4">Sign up and generate your API key from the dashboard.</p>
          <button onclick="showLogin()" class="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Get API Key
          </button>
        </div>
        
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 class="text-xl font-bold mb-4 text-green-400">2. Install SDK</h3>
          <div class="bg-slate-900 rounded-lg p-3 font-mono text-sm">
            <code>pip install openai</code>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
        <h3 class="text-xl font-bold mb-4 text-purple-400">3. Make Your First Request</h3>
        <pre><code class="language-python"># Install the OpenAI package
pip install openai

# Use with our API
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://jasysai.jasyscom-corp.workers.dev/v1"
)

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)</code></pre>
      </div>
    </div>
  </section>

  <!-- API Reference -->
  <section id="api-reference" class="py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">API Reference</h2>
      
      <!-- Base URL -->
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <h3 class="text-xl font-bold mb-4">Base URL</h3>
        <div class="bg-slate-900 rounded-lg p-3 font-mono text-sm">
          <code>https://jasysai.jasyscom-corp.workers.dev</code>
        </div>
      </div>

      <!-- Authentication -->
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <h3 class="text-xl font-bold mb-4">Authentication</h3>
        <p class="text-slate-300 mb-4">Include your API key in the Authorization header:</p>
        <div class="bg-slate-900 rounded-lg p-3 font-mono text-sm">
          <code>Authorization: Bearer your-api-key</code>
        </div>
      </div>

      <!-- Chat Completions -->
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <h3 class="text-xl font-bold mb-4">Chat Completions</h3>
        <p class="text-slate-300 mb-4">POST /v1/chat/completions</p>
        
        <h4 class="text-lg font-semibold mb-3 text-blue-400">Request Parameters</h4>
        <div class="overflow-x-auto mb-6">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-slate-600">
                <th class="text-left py-2">Parameter</th>
                <th class="text-left py-2">Type</th>
                <th class="text-left py-2">Required</th>
                <th class="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-slate-700">
                <td class="py-2 font-mono">model</td>
                <td class="py-2">string</td>
                <td class="py-2 text-green-400">Yes</td>
                <td class="py-2">Model ID to use</td>
              </tr>
              <tr class="border-b border-slate-700">
                <td class="py-2 font-mono">messages</td>
                <td class="py-2">array</td>
                <td class="py-2 text-green-400">Yes</td>
                <td class="py-2">Array of message objects</td>
              </tr>
              <tr class="border-b border-slate-700">
                <td class="py-2 font-mono">temperature</td>
                <td class="py-2">number</td>
                <td class="py-2 text-slate-400">No</td>
                <td class="py-2">Sampling temperature (0-2)</td>
              </tr>
              <tr class="border-b border-slate-700">
                <td class="py-2 font-mono">max_tokens</td>
                <td class="py-2">integer</td>
                <td class="py-2 text-slate-400">No</td>
                <td class="py-2">Maximum tokens to generate</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="text-lg font-semibold mb-3 text-green-400">Example Request</h4>
        <pre><code class="language-bash">curl -X POST "https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'</code></pre>

        <h4 class="text-lg font-semibold mb-3 text-purple-400">Response</h4>
        <pre><code class="language-json">{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "openai/gpt-4",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I help you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 9,
    "total_tokens": 19
  }
}</code></pre>
      </div>

      <!-- Available Models -->
      <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 mb-8">
        <h3 class="text-xl font-bold mb-4">Available Models</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div>
            <h4 class="font-semibold mb-2 text-green-400">Free Tier</h4>
            <ul class="space-y-1 text-sm text-slate-300">
              <li>• openai/gpt-3.5-turbo</li>
              <li>• anthropic/claude-3-haiku</li>
              <li>• meta-llama/llama-3.1-8b-instruct</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-2 text-blue-400">Premium</h4>
            <ul class="space-y-1 text-sm text-slate-300">
              <li>• openai/gpt-4</li>
              <li>• anthropic/claude-3-sonnet</li>
              <li>• openai/gpt-4-turbo</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-2 text-purple-400">Enterprise</h4>
            <ul class="space-y-1 text-sm text-slate-300">
              <li>• anthropic/claude-3-opus</li>
              <li>• openai/gpt-4-vision-preview</li>
              <li>• google/gemini-pro</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Code Examples -->
  <section class="py-12 px-6">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">Code Examples</h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 class="text-xl font-bold mb-4 text-blue-400">Python</h3>
          <pre><code class="language-python">import openai

client = openai.OpenAI(
    api_key="your-api-key",
    base_url="https://jasysai.jasyscom-corp.workers.dev/v1"
)

response = client.chat.completions.create(
    model="openai/gpt-4",
    messages=[
        {"role": "user", "content": "Hello!"}
    ]
)

print(response.choices[0].message.content)</code></pre>
        </div>

        <div class="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <h3 class="text-xl font-bold mb-4 text-green-400">JavaScript</h3>
          <pre><code class="language-javascript">import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key',
  baseURL: 'https://jasysai.jasyscom-corp.workers.dev/v1'
});

async function chat() {
  const completion = await openai.chat.completions.create({
    model: 'openai/gpt-4',
    messages: [{ role: 'user', content: 'Hello!' }]
  });

  console.log(completion.choices[0].message.content);
}</code></pre>
        </div>
      </div>
    </div>
  </section>

  <!-- API Tester Modal -->
  <div id="api-tester" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">API Tester</h3>
          <button onclick="closeApiTester()" class="text-slate-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">API Key</label>
            <input type="password" id="test-api-key" placeholder="Enter your API key" 
                   class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none">
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Model</label>
            <select id="test-model" class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none">
              <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="openai/gpt-4">GPT-4</option>
              <option value="anthropic/claude-3-haiku">Claude 3 Haiku</option>
              <option value="anthropic/claude-3-sonnet">Claude 3 Sonnet</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Message</label>
            <textarea id="test-message" rows="3" placeholder="Enter your message here..." 
                      class="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none">Hello! Tell me about JasysAI.</textarea>
          </div>

          <div class="flex gap-4">
            <button onclick="testApi()" class="bg-brand px-6 py-2 rounded-lg font-bold hover:bg-brand/90 transition">
              Test API
            </button>
            <button onclick="clearTest()" class="bg-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-slate-600 transition">
              Clear
            </button>
          </div>

          <div id="test-result" class="hidden">
            <h4 class="font-semibold mb-2">Response:</h4>
            <div id="test-response" class="bg-slate-900 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap"></div>
          </div>
        </div>
      </div>
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
            <li><a href="/#features" class="hover:text-white transition">Features</a></li>
            <li><a href="/#pricing" class="hover:text-white transition">Pricing</a></li>
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
    // Initialize Prism.js
    Prism.highlightAll();

    function scrollToSection(sectionId) {
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }

    function showLogin() {
      location.href = '/app';
    }

    function openApiTester() {
      document.getElementById('api-tester').classList.remove('hidden');
    }

    function closeApiTester() {
      document.getElementById('api-tester').classList.add('hidden');
    }

    async function testApi() {
      const apiKey = document.getElementById('test-api-key').value;
      const model = document.getElementById('test-model').value;
      const message = document.getElementById('test-message').value;

      if (!apiKey) {
        alert('Please enter your API key');
        return;
      }

      const resultDiv = document.getElementById('test-result');
      const responseDiv = document.getElementById('test-response');
      
      resultDiv.classList.remove('hidden');
      responseDiv.textContent = 'Testing API...';

      try {
        const response = await fetch('https://jasysai.jasyscom-corp.workers.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${apiKey}\`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: message }]
          })
        });

        const data = await response.json();
        
        if (response.ok) {
          responseDiv.textContent = JSON.stringify(data, null, 2);
        } else {
          responseDiv.textContent = \`Error: \${response.status}\\n\${JSON.stringify(data, null, 2)}\`;
        }
      } catch (error) {
        responseDiv.textContent = \`Network Error: \${error.message}\`;
      }
    }

    function clearTest() {
      document.getElementById('test-api-key').value = '';
      document.getElementById('test-message').value = 'Hello! Tell me about JasysAI.';
      document.getElementById('test-result').classList.add('hidden');
    }
  </script>
</body></html>`;
}