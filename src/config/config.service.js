// @ts-nocheck
// Dynamic Configuration Service using KV storage
export class ConfigService {
  static async getGuestLimit(env) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const settings = await DB.get(env, 'sys_settings');
      if (settings) {
        return settings.guest_limit || 5; // Default fallback
      }
    } catch (error) {
      console.error('Error fetching guest limit:', error);
    }
    return 5; // Default fallback
  }

  static async setGuestLimit(env, limit) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const settings = await DB.get(env, 'sys_settings') || {};
      settings.guest_limit = String(parseInt(limit));
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting guest limit:', error);
      return false;
    }
  }

  static async getAllSettings(env) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const settings = await DB.get(env, 'sys_settings');
      
      // Set initial admin credentials if they don't exist
      if (!settings || !settings.admin_user || !settings.admin_pass) {
        const initialSettings = {
          admin_user: 'admin',
          admin_pass: 'admin123',
          default_credits: 5000,
          profit_margin: 1.5,
          idr_rate: 16909,
          guest_limit: 10,
          openrouter_key: '',
          midtrans_server_key: '',
          midtrans_client_key: '',
          midtrans_environment: 'sandbox', // 'sandbox' or 'production'
          guest_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
          user_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet'],
          ai_providers: [
            {
              id: 'openrouter',
              name: 'OpenRouter',
              endpoint: 'https://openrouter.ai/api/v1',
              api_key: '',
              active: true
            }
          ],
          subscription_plans: [
            { 
              id: 'free', 
              name: 'Free Plan', 
              price: 0, 
              credits: 5000, 
              users: 1, 
              features: ['Basic models', '5,000 credits/month', 'Community support', 'Standard API rate limits'],
              available_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct']
            },
            { 
              id: 'basic', 
              name: 'Basic Plan', 
              price: 29000, 
              credits: 20000, 
              users: 1, 
              features: ['All models', '20,000 credits/month', 'Email support', 'Priority API rate limits', 'Usage analytics'],
              available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
            },
            { 
              id: 'pro', 
              name: 'Pro Plan', 
              price: 79000, 
              credits: 60000, 
              users: 5, 
              features: ['All models', '60,000 credits/month', 'Priority email support', 'Higher API rate limits', 'Team management', 'Advanced analytics', 'Custom branding'],
              available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
            },
            { 
              id: 'enterprise', 
              name: 'Enterprise Plan', 
              price: 199000, 
              credits: 200000, 
              users: 20, 
              features: ['All models', '200,000 credits/month', '24/7 phone support', 'Unlimited API rate limits', 'Advanced team management', 'Custom models', 'SLA guarantee', 'Dedicated account manager'],
              available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
            }
          ],
          credit_packages: [
            { id: '10k', name: '10,000 Credits', price: 15000, credits: 10000, bonus_models: ['openai/gpt-4'] },
            { id: '50k', name: '50,000 Credits', price: 70000, credits: 50000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus'] },
            { id: '100k', name: '100,000 Credits', price: 130000, credits: 100000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo'] },
            { id: '500k', name: '500,000 Credits', price: 600000, credits: 500000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet'] }
          ],
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
          social: {
            twitter: 'https://twitter.com/jasysai',
            github: 'https://github.com/jasysai',
            linkedin: 'https://linkedin.com/company/jasysai',
            website: 'https://jasysai.com'
          },
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
        
        await DB.set(env, 'sys_settings', initialSettings);
        return initialSettings;
      }
      
      return settings; // Return the settings if they exist
      
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Fallback to default settings if KV is not available
      return {
        admin_user: 'admin',
        admin_pass: 'admin123',
        default_credits: 5000,
        profit_margin: 1.5,
        idr_rate: 16909,
        guest_limit: 10,
        openrouter_key: '',
        midtrans_server_key: '',
        midtrans_client_key: '',
        midtrans_environment: 'sandbox',
        guest_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
        user_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet'],
        ai_providers: [
          {
            id: 'openrouter',
            name: 'OpenRouter',
            endpoint: 'https://openrouter.ai/api/v1',
            api_key: '',
            active: true
          }
        ],
        subscription_plans: [
          { 
            id: 'free', 
            name: 'Free Plan', 
            price: 0, 
            credits: 5000, 
            users: 1, 
            features: ['Basic models', '5,000 credits/month', 'Community support', 'Standard API rate limits'],
            available_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct']
          },
          { 
            id: 'basic', 
            name: 'Basic Plan', 
            price: 29000, 
            credits: 20000, 
            users: 1, 
            features: ['All models', '20,000 credits/month', 'Email support', 'Priority API rate limits', 'Usage analytics'],
            available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
          },
          { 
            id: 'pro', 
            name: 'Pro Plan', 
            price: 79000, 
            credits: 60000, 
            users: 5, 
            features: ['All models', '60,000 credits/month', 'Priority email support', 'Higher API rate limits', 'Team management', 'Advanced analytics', 'Custom branding'],
            available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
          },
          { 
            id: 'enterprise', 
            name: 'Enterprise Plan', 
            price: 199000, 
            credits: 200000, 
            users: 20, 
            features: ['All models', '200,000 credits/month', '24/7 phone support', 'Unlimited API rate limits', 'Advanced team management', 'Custom models', 'SLA guarantee', 'Dedicated account manager'],
            available_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
          }
        ],
        credit_packages: [
          { id: '10k', name: '10,000 Credits', price: 15000, credits: 10000, bonus_models: ['openai/gpt-4'] },
          { id: '50k', name: '50,000 Credits', price: 70000, credits: 50000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus'] },
          { id: '100k', name: '100,000 Credits', price: 130000, credits: 100000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo'] },
          { id: '500k', name: '500,000 Credits', price: 600000, credits: 500000, bonus_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet'] }
        ],
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
        social: {
          twitter: 'https://twitter.com/jasysai',
          github: 'https://github.com/jasysai',
          linkedin: 'https://linkedin.com/company/jasysai',
          website: 'https://jasysai.com'
        },
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
    }
  }

  static async updateSettings(env, settings) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const current = await this.getAllSettings(env);
      const updated = { ...current, ...settings };
      await DB.set(env, 'sys_settings', updated);
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  }

  static async getAdminUser(env) {
    try {
      const settings = await this.getAllSettings(env);
      return settings.admin_user;
    } catch (error) {
      console.error('Error getting admin user:', error);
      return null;
    }
  }

  static async getAdminPass(env) {
    try {
      const settings = await this.getAllSettings(env);
      return settings.admin_pass;
    } catch (error) {
      console.error('Error getting admin pass:', error);
      return null;
    }
  }

  static async setAdminCredentials(env, username, password) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.admin_user = username;
      settings.admin_pass = password;
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting admin credentials:', error);
      return false;
    }
  }

  static async getDefaultCredits(env) {
    try {
      const settings = await this.getAllSettings(env);
      return settings.default_credits || 5000;
    } catch (error) {
      console.error('Error getting default credits:', error);
      return 5000;
    }
  }

  static async setDefaultCredits(env, credits) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.default_credits = credits;
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting default credits:', error);
      return false;
    }
  }

  static async getProfitMargin(env) {
    try {
      const settings = await this.getAllSettings(env);
      return settings.profit_margin || 1.5;
    } catch (error) {
      console.error('Error getting profit margin:', error);
      return 1.5;
    }
  }

  static async setProfitMargin(env, margin) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.profit_margin = margin;
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting profit margin:', error);
      return false;
    }
  }

  static async getIDRRate(env) {
    try {
      const settings = await this.getAllSettings(env);
      return settings.idr_rate || 16909;
    } catch (error) {
      console.error('Error getting IDR rate:', error);
      return 16909;
    }
  }

  static async setIDRRate(env, rate) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.idr_rate = rate;
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting IDR rate:', error);
      return false;
    }
  }

  static async isAdminBypassEnabled(env) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const settings = await DB.get(env, 'sys_settings');
      if (settings) {
        return settings.admin_bypass !== false; // Default to true
      }
    } catch (error) {
      console.error('Error checking admin bypass:', error);
    }
    return true; // Default fallback
  }

  static async setAdminBypass(env, enabled) {
    try {
      // Import DB to avoid circular dependencies
      const { DB } = await import('../db/database.js');
      const settings = await DB.get(env, 'sys_settings') || {};
      settings.admin_bypass = enabled;
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error setting admin bypass:', error);
      return false;
    }
  }

  // AI Providers Management
  static async getAIProviders(env) {
    const settings = await this.getAllSettings(env);
    return settings.ai_providers || [];
  }

  static async addAIProvider(env, provider) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.ai_providers = settings.ai_providers || [];
      
      // Check if provider already exists
      const existing = settings.ai_providers.find(p => p.id === provider.id);
      if (existing) {
        return false;
      }
      
      settings.ai_providers.push({
        id: provider.id,
        name: provider.name,
        endpoint: provider.endpoint,
        api_key: provider.api_key,
        active: provider.active !== false
      });
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error adding AI provider:', error);
      return false;
    }
  }

  static async updateAIProvider(env, providerId, updates) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      const providerIndex = settings.ai_providers.findIndex(p => p.id === providerId);
      
      if (providerIndex === -1) {
        return false;
      }
      
      settings.ai_providers[providerIndex] = {
        ...settings.ai_providers[providerIndex],
        ...updates
      };
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error updating AI provider:', error);
      return false;
    }
  }

  static async deleteAIProvider(env, providerId) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.ai_providers = settings.ai_providers.filter(p => p.id !== providerId);
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error deleting AI provider:', error);
      return false;
    }
  }

  // Subscription Plans Management
  static async getSubscriptionPlans(env) {
    const settings = await this.getAllSettings(env);
    return settings.subscription_plans || [];
  }

  static async addSubscriptionPlan(env, plan) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.subscription_plans = settings.subscription_plans || [];
      
      // Check if plan already exists
      const existing = settings.subscription_plans.find(p => p.id === plan.id);
      if (existing) {
        return false;
      }
      
      settings.subscription_plans.push({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        credits: plan.credits,
        users: plan.users,
        features: plan.features || [],
        available_models: plan.available_models || []
      });
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error adding subscription plan:', error);
      return false;
    }
  }

  static async updateSubscriptionPlan(env, planId, updates) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      const planIndex = settings.subscription_plans.findIndex(p => p.id === planId);
      
      if (planIndex === -1) {
        return false;
      }
      
      settings.subscription_plans[planIndex] = {
        ...settings.subscription_plans[planIndex],
        ...updates
      };
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error updating subscription plan:', error);
      return false;
    }
  }

  static async deleteSubscriptionPlan(env, planId) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.subscription_plans = settings.subscription_plans.filter(p => p.id !== planId);
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error deleting subscription plan:', error);
      return false;
    }
  }

  // Credit Packages Management
  static async getCreditPackages(env) {
    const settings = await this.getAllSettings(env);
    return settings.credit_packages || [];
  }

  static async addCreditPackage(env, pkg) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.credit_packages = settings.credit_packages || [];
      
      // Check if package already exists
      const existing = settings.credit_packages.find(p => p.id === pkg.id);
      if (existing) {
        return false;
      }
      
      settings.credit_packages.push({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        credits: pkg.credits,
        bonus_models: pkg.bonus_models || []
      });
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error adding credit package:', error);
      return false;
    }
  }

  static async updateCreditPackage(env, packageId, updates) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      const packageIndex = settings.credit_packages.findIndex(p => p.id === packageId);
      
      if (packageIndex === -1) {
        return false;
      }
      
      settings.credit_packages[packageIndex] = {
        ...settings.credit_packages[packageIndex],
        ...updates
      };
      
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error updating credit package:', error);
      return false;
    }
  }

  static async deleteCreditPackage(env, packageId) {
    try {
      const { DB } = await import('../db/database.js');
      const settings = await this.getAllSettings(env);
      settings.credit_packages = settings.credit_packages.filter(p => p.id !== packageId);
      await DB.set(env, 'sys_settings', settings);
      return true;
    } catch (error) {
      console.error('Error deleting credit package:', error);
      return false;
    }
  }

  // Get available models for user based on credits and subscription
  static async getAvailableModelsForUser(env, user) {
    try {
      const settings = await this.getAllSettings(env);
      
      // Start with basic free models
      let availableModels = new Set(settings.guest_models);
      
      // Add user's unlocked models
      if (user.unlocked_models) {
        user.unlocked_models.forEach(model => availableModels.add(model));
      }
      
      // Check if user has an active subscription
      if (user.subscription && user.subscription !== 'free') {
        const plan = settings.subscription_plans.find(p => p.id === user.subscription);
        if (plan && plan.available_models) {
          plan.available_models.forEach(model => availableModels.add(model));
        }
      }
      
      // Check if user has purchased credit packages with bonus models
      // This would require tracking purchased packages, but for now, we'll assume all bonus models are available based on credits
      // In a real implementation, you would track which packages the user has purchased
      
      return Array.from(availableModels);
    } catch (error) {
      console.error('Error getting available models for user:', error);
      return [];
    }
  }
}