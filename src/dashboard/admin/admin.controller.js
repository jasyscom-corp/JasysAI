import { DB } from '../../db/index.js';
import { ConfigService } from '../../config/config.service.js';

export class AdminController {
  static async getDashboardData(env) {
    const users = await DB.list(env, 'u:');
    const logs = await DB.list(env, 'log:');
    const settings = await ConfigService.getAllSettings(env);
    
    const recentLogs = [];
    for (const log of logs.keys.slice(-50)) {
      const data = await DB.get(env, log.name);
      if (data) recentLogs.push(data);
    }
    
    // Calculate active users today
    const today = new Date().toISOString().split('T')[0];
    let activeToday = 0;
    let totalUsage = 0;
    
    for (const userKey of users.keys) {
      const user = await DB.get(env, userKey.name);
      if (user) {
        // Check if user has usage today
        if (user.usage_daily && user.usage_daily[today]) {
          activeToday++;
        }
        totalUsage += user.total_used || 0;
      }
    }
    
    return {
      userCount: users.keys.length,
      activeToday,
      totalUsage,
      logs: recentLogs.reverse(),
      settings
    };
  }

  static async updateSettings(env, settings) {
    return await ConfigService.updateSettings(env, settings);
  }

  static async getUsers(env) {
    const users = await DB.list(env, 'u:');
    const userList = [];
    
    for (const userKey of users.keys) {
      const user = await DB.get(env, userKey.name);
      if (user) {
        userList.push({
          email: user.email,
          name: user.name,
          credits: user.credits,
          created: user.created,
          total_used: user.total_used || 0,
          api_keys_count: user.api_keys?.length || 0,
          unlocked_models_count: user.unlocked_models?.length || 0
        });
      }
    }
    
    return userList;
  }

  static async getUserLogs(env, email) {
    const logs = await DB.list(env, `log:`);
    const userLogs = [];
    
    for (const logKey of logs.keys) {
      const data = await DB.get(env, logKey.name);
      if (data && data.email === email) {
        userLogs.push(data);
      }
    }
    
    return userLogs.reverse();
  }

  static async deleteUser(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) {
      return { err: 'User not found' };
    }
    
    // Delete user data
    await DB.del(env, `u:${email}`);
    await DB.del(env, `chat:${email}`);
    
    // Delete user's logs
    const logs = await DB.list(env, `log:`);
    for (const logKey of logs.keys) {
      const logData = await DB.get(env, logKey.name);
      if (logData && logData.email === email) {
        await DB.del(env, logKey.name);
      }
    }
    
    return { ok: true };
  }

  static async addCredits(env, email, amount) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) {
      return { err: 'User not found' };
    }
    
    user.credits += amount;
    await DB.set(env, `u:${email}`, user);
    
    return { ok: true, newCredits: user.credits };
  }

  static async getUserDetails(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) {
      return null;
    }
    
    const logs = await this.getUserLogs(env, email);
    
    return {
      user,
      logs
    };
  }

  // AI Providers Management
  static async getAIProviders(env) {
    return await ConfigService.getAIProviders(env);
  }

  static async addAIProvider(env, providerData) {
    return await ConfigService.addAIProvider(env, providerData);
  }

  static async updateAIProvider(env, providerId, updates) {
    return await ConfigService.updateAIProvider(env, providerId, updates);
  }

  static async deleteAIProvider(env, providerId) {
    return await ConfigService.deleteAIProvider(env, providerId);
  }

  // Subscription Plans Management
  static async getSubscriptionPlans(env) {
    return await ConfigService.getSubscriptionPlans(env);
  }

  static async addSubscriptionPlan(env, planData) {
    return await ConfigService.addSubscriptionPlan(env, planData);
  }

  static async updateSubscriptionPlan(env, planId, updates) {
    return await ConfigService.updateSubscriptionPlan(env, planId, updates);
  }

  static async deleteSubscriptionPlan(env, planId) {
    return await ConfigService.deleteSubscriptionPlan(env, planId);
  }

  // Credit Packages Management
  static async getCreditPackages(env) {
    return await ConfigService.getCreditPackages(env);
  }

  static async addCreditPackage(env, packageData) {
    return await ConfigService.addCreditPackage(env, packageData);
  }

  static async updateCreditPackage(env, packageId, updates) {
    return await ConfigService.updateCreditPackage(env, packageId, updates);
  }

  static async deleteCreditPackage(env, packageId) {
    return await ConfigService.deleteCreditPackage(env, packageId);
  }

  // System Settings Management
  static async getAdminCredentials(env) {
    return {
      username: await ConfigService.getAdminUser(env),
      password: await ConfigService.getAdminPass(env)
    };
  }

  static async updateAdminCredentials(env, username, password) {
    return await ConfigService.setAdminCredentials(env, username, password);
  }

  static async getDefaultCredits(env) {
    return await ConfigService.getDefaultCredits(env);
  }

  static async updateDefaultCredits(env, credits) {
    return await ConfigService.setDefaultCredits(env, credits);
  }

  static async getProfitMargin(env) {
    return await ConfigService.getProfitMargin(env);
  }

  static async updateProfitMargin(env, margin) {
    return await ConfigService.setProfitMargin(env, margin);
  }

  static async getIDRRate(env) {
    return await ConfigService.getIDRRate(env);
  }

  static async updateIDRRate(env, rate) {
    return await ConfigService.setIDRRate(env, rate);
  }

  static async getGuestLimit(env) {
    return await ConfigService.getGuestLimit(env);
  }

  static async updateGuestLimit(env, limit) {
    return await ConfigService.setGuestLimit(env, limit);
  }

  static async getSystemSettings(env) {
    const settings = await ConfigService.getAllSettings(env);
    return {
      admin_user: settings.admin_user,
      default_credits: settings.default_credits,
      profit_margin: settings.profit_margin,
      idr_rate: settings.idr_rate,
      guest_limit: settings.guest_limit,
      midtrans_server_key: settings.midtrans_server_key,
      midtrans_client_key: settings.midtrans_client_key,
      midtrans_environment: settings.midtrans_environment
    };
  }
}