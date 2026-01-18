export default {
  site_name: "Jasys AI",
  site_url: "https://ai.jasyscom-corp.workers.dev",
  admin_user: "jasyscorp",
  admin_pass: "Jasyscorp-admin123000",
  default_credits: 5000,
  profit_margin: 1.5,
  idr_rate: 16909,
  guest_limit: 10,
  // Default model settings
  default_models: {
    guest: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
    user: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
  },
  // Packages for unlocking models
  packages: [
    { id: 'basic', name: 'Basic Package', price: 25000, unlocks: ['openai/gpt-4'] },
    { id: 'premium', name: 'Premium Package', price: 50000, unlocks: ['openai/gpt-4', 'anthropic/claude-3-opus'] },
    { id: 'ultimate', name: 'Ultimate Package', price: 100000, unlocks: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo'] }
  ],
  // SEO Configuration
  seo: {
    default_title: 'Jasys AI - Advanced AI Platform for Developers',
    default_description: 'Access powerful AI models through simple, transparent APIs. Jasys AI provides cutting-edge language models with developer-friendly integration and scalable infrastructure.',
    default_keywords: 'Jasys AI, AI platform, artificial intelligence, language models, API, developers, machine learning, GPT, Claude, Gemini',
    author: 'Jasys AI Team',
    twitter_handle: '@jasysai',
    og_image: '/assets/logo.png',
    theme_color: '#7c3aed',
    favicon_sizes: [16, 32, 180],
    apple_touch_icon: true,
    webmanifest: true
  },
  // Social Media Links
  social: {
    twitter: 'https://twitter.com/jasysai',
    github: 'https://github.com/jasysai',
    linkedin: 'https://linkedin.com/company/jasysai',
    website: 'https://jasysai.com'
  },
  // Company Information
  company: {
    name: 'Jasys AI',
    description: 'Leading AI platform providing access to powerful language models through simple, transparent APIs.',
    founded: '19 January 2026',
    location: 'Global',
    contact_email: 'contact@jasysai.com',
    support_email: 'support@jasysai.com',
    technical_support: 'technical@jasysai.com'
  }
};