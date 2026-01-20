export default {
  site_name: "Jasys AI",
  site_url: "https://ai.jasyscom.workers.dev",
  default_credits: 5000,
  profit_margin: 1.5,
  idr_rate: 16909,
  guest_limit: 10,
  // Default model settings
  default_models: {
    guest: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
    user: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
  },
  // Subscription plans
  subscription_plans: [
    { 
      id: 'free', 
      name: 'Free Plan', 
      price: 0, 
      credits: 5000, 
      users: 1, 
      features: ['Basic models', '5,000 credits/month', 'Community support', 'Standard API rate limits']
    },
    { 
      id: 'basic', 
      name: 'Basic Plan', 
      price: 29000, 
      credits: 20000, 
      users: 1, 
      features: ['All models', '20,000 credits/month', 'Email support', 'Priority API rate limits', 'Usage analytics']
    },
    { 
      id: 'pro', 
      name: 'Pro Plan', 
      price: 79000, 
      credits: 60000, 
      users: 5, 
      features: ['All models', '60,000 credits/month', 'Priority email support', 'Higher API rate limits', 'Team management', 'Advanced analytics', 'Custom branding']
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise Plan', 
      price: 199000, 
      credits: 200000, 
      users: 20, 
      features: ['All models', '200,000 credits/month', '24/7 phone support', 'Unlimited API rate limits', 'Advanced team management', 'Custom models', 'SLA guarantee', 'Dedicated account manager']
    }
  ],
  // Credit packages for purchase
  credit_packages: [
    { id: '10k', name: '10,000 Credits', price: 15000, credits: 10000 },
    { id: '50k', name: '50,000 Credits', price: 70000, credits: 50000 },
    { id: '100k', name: '100,000 Credits', price: 130000, credits: 100000 },
    { id: '500k', name: '500,000 Credits', price: 600000, credits: 500000 }
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