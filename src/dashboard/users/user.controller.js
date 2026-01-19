import { DB } from '../../db/index.js';
import { CONFIG } from '../../config/index.js';
import { ConfigService } from '../../config/config.service.js';
import { Team } from '../../models/team.model.js';

export class UserController {
  // Package Purchase (backward compatibility)
  static async purchasePackage(env, email, packageId) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    const pkg = CONFIG.packages.find(p => p.id === packageId);
    if (!pkg) return { err: "Package not found" };
    
    if (user.credits < pkg.price) {
      return { err: "Insufficient credits" };
    }
    
    user.credits -= pkg.price;
    user.unlocked_models = user.unlocked_models || [];
    pkg.unlocks.forEach(model => {
      if (!user.unlocked_models.includes(model)) {
        user.unlocked_models.push(model);
      }
    });
    
    await DB.set(env, `u:${email}`, user);
    return { ok: true };
  }

  // API Key Management
  static async createApiKey(env, email, name) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    const apiKey = 'sk-' + crypto.randomUUID().replace(/-/g, '');
    const keyData = {
      key: apiKey,
      name,
      created: new Date().toISOString(),
      lastUsed: null
    };
    
    user.api_keys = user.api_keys || [];
    user.api_keys.push(keyData);
    
    await DB.set(env, `u:${email}`, user);
    return { ok: true, key: apiKey };
  }

  static async deleteApiKey(env, email, key) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    user.api_keys = user.api_keys.filter(k => k.key !== key);
    await DB.set(env, `u:${email}`, user);
    return { ok: true };
  }

  // Account Management
  static async updateAccount(env, email, updates) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    if (updates.name) user.name = updates.name;
    if (updates.password) user.pass = updates.password;
    if (updates.billing) {
      user.billing = { ...user.billing, ...updates.billing };
    }
    
    await DB.set(env, `u:${email}`, user);
    return { ok: true };
  }

  // Billing & Subscription
  static async purchaseCredits(env, email, packageId) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    const creditPackages = await ConfigService.getCreditPackages(env);
    const creditPackage = creditPackages.find(p => p.id === packageId);
    if (!creditPackage) return { err: "Package not found" };
    
    // In real implementation, this would integrate with payment gateway
    user.credits = (user.credits || 0) + creditPackage.credits;
    user.billing.invoices = user.billing.invoices || [];
    user.billing.invoices.push({
      id: 'inv-' + Date.now(),
      date: new Date().toISOString(),
      amount: creditPackage.price,
      credits: creditPackage.credits,
      status: 'paid',
      type: 'credit_purchase'
    });
    
    // Add bonus models based on credit package
    user.unlocked_models = user.unlocked_models || [];
    if (creditPackage.bonus_models) {
      creditPackage.bonus_models.forEach(model => {
        if (!user.unlocked_models.includes(model)) {
          user.unlocked_models.push(model);
        }
      });
    }
    
    await DB.set(env, `u:${email}`, user);
    return { ok: true, creditsAdded: creditPackage.credits };
  }

  static async subscribePlan(env, email, planId) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    const plans = await ConfigService.getSubscriptionPlans(env);
    const plan = plans.find(p => p.id === planId);
    if (!plan) return { err: "Plan not found" };
    
    // Calculate subscription end date (1 month from now)
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    
    user.subscription = planId;
    user.subscription_status = 'active';
    user.subscription_end = endDate.toISOString();
    
    // Add monthly credits
    user.credits = (user.credits || 0) + plan.credits;
    
    // Create invoice
    user.billing.invoices = user.billing.invoices || [];
    user.billing.invoices.push({
      id: 'inv-' + Date.now(),
      date: new Date().toISOString(),
      amount: plan.price,
      credits: plan.credits,
      status: 'paid',
      type: 'subscription'
    });
    
    // Unlock available models for this plan
    user.unlocked_models = user.unlocked_models || [];
    if (plan.available_models) {
      plan.available_models.forEach(model => {
        if (!user.unlocked_models.includes(model)) {
          user.unlocked_models.push(model);
        }
      });
    }
    
    await DB.set(env, `u:${email}`, user);
    return { ok: true, plan: planId, creditsAdded: plan.credits };
  }

  // Team Management
  static async createTeam(env, email, teamName) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    // Check if user already has a team
    if (user.team) return { err: "Already in a team" };
    
    const team = new Team({
      name: teamName,
      owner: email,
      members: []
    });
    
    await DB.set(env, `team:${team.id}`, team);
    
    user.team = team.id;
    user.team_role = 'owner';
    await DB.set(env, `u:${email}`, user);
    
    return { ok: true, teamId: team.id };
  }

  static async joinTeam(env, email, teamId) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    const team = await DB.get(env, `team:${teamId}`);
    if (!team) return { err: "Team not found" };
    
    // Check if user is already in a team
    if (user.team) return { err: "Already in a team" };
    
    team.addMember(email, 'member');
    await DB.set(env, `team:${teamId}`, team);
    
    user.team = teamId;
    user.team_role = 'member';
    await DB.set(env, `u:${email}`, user);
    
    return { ok: true };
  }

  static async leaveTeam(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    if (!user.team) return { err: "Not in a team" };
    
    const team = await DB.get(env, `team:${user.team}`);
    if (!team) return { err: "Team not found" };
    
    // Owner can't leave team - must transfer ownership first
    if (user.team_role === 'owner') return { err: "Owner can't leave team" };
    
    team.removeMember(email);
    await DB.set(env, `team:${user.team}`, team);
    
    user.team = null;
    user.team_role = null;
    await DB.set(env, `u:${email}`, user);
    
    return { ok: true };
  }

  static async inviteTeamMember(env, email, inviteEmail) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    if (!user.team || (user.team_role !== 'owner' && user.team_role !== 'admin')) {
      return { err: "Not authorized" };
    }
    
    const team = await DB.get(env, `team:${user.team}`);
    if (!team) return { err: "Team not found" };
    
    // Check if user exists
    const inviteUser = await DB.get(env, `u:${inviteEmail}`);
    if (!inviteUser) return { err: "User not found" };
    
    // Check if already in team
    if (inviteUser.team) return { err: "User already in a team" };
    
    team.addMember(inviteEmail, 'member');
    await DB.set(env, `team:${user.team}`, team);
    
    inviteUser.team = user.team;
    inviteUser.team_role = 'member';
    await DB.set(env, `u:${inviteEmail}`, inviteUser);
    
    return { ok: true };
  }

  static async removeTeamMember(env, email, memberEmail) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    if (!user.team || (user.team_role !== 'owner' && user.team_role !== 'admin')) {
      return { err: "Not authorized" };
    }
    
    const team = await DB.get(env, `team:${user.team}`);
    if (!team) return { err: "Team not found" };
    
    team.removeMember(memberEmail);
    await DB.set(env, `team:${user.team}`, team);
    
    const member = await DB.get(env, `u:${memberEmail}`);
    if (member) {
      member.team = null;
      member.team_role = null;
      await DB.set(env, `u:${memberEmail}`, member);
    }
    
    return { ok: true };
  }

  static async updateTeamMemberRole(env, email, memberEmail, role) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return { err: "User not found" };
    
    if (!user.team || user.team_role !== 'owner') {
      return { err: "Not authorized" };
    }
    
    const team = await DB.get(env, `team:${user.team}`);
    if (!team) return { err: "Team not found" };
    
    team.updateMemberRole(memberEmail, role);
    await DB.set(env, `team:${user.team}`, team);
    
    const member = await DB.get(env, `u:${memberEmail}`);
    if (member) {
      member.team_role = role;
      await DB.set(env, `u:${memberEmail}`, member);
    }
    
    return { ok: true };
  }

  static async getTeam(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user || !user.team) return null;
    
    const team = await DB.get(env, `team:${user.team}`);
    if (!team) return null;
    
    return team;
  }

  // Usage & Analytics
  static async getChatHistory(env, email) {
    const history = await DB.get(env, `chat:${email}`) || [];
    return history.map(h => ({
      id: h.id,
      title: h.title || 'Untitled Chat',
      date: h.created,
      messageCount: h.messages?.length || 0
    }));
  }

  static async getUsageStats(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return null;
    
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = user.usage_daily?.[today] || 0;
    
    return {
      totalCredits: user.credits,
      totalUsed: user.total_used || 0,
      todayUsage,
      activeDays: Object.keys(user.usage_daily || {}).length,
      apiKeysCount: user.api_keys?.length || 0,
      unlockedModelsCount: user.unlocked_models?.length || 0,
      subscription: user.subscription || 'free',
      subscriptionStatus: user.subscription_status || 'active',
      subscriptionEnd: user.subscription_end
    };
  }

  static async getChat(env, email, chatId) {
    const history = await DB.get(env, `chat:${email}`) || [];
    return history.find(h => h.id === chatId);
  }

  static async getAvailableModels(env, email) {
    const user = await DB.get(env, `u:${email}`);
    if (!user) return [];
    
    const availableModels = new Set([
      ...CONFIG.default_models.user,
      ...(user.unlocked_models || [])
    ]);
    
    try {
      const res = await fetch('https://openrouter.ai/api/v1/models');
      const data = await res.json();
      return data.data.filter(m => availableModels.has(m.id)).map(m => ({
        id: m.id,
        name: m.name,
        description: m.description
      }));
    } catch (error) {
      console.error('Error fetching model details:', error);
      return [];
    }
  }

  // API Request History
  static async getApiRequests(env, email) {
    const prefix = 'log:';
    const logs = [];
    
    try {
      const listResult = await DB.list(env, prefix);
      
      for (const logKey of listResult.keys) {
        const logData = await DB.get(env, logKey.name);
        if (logData && logData.email === email) {
          logs.push({
            time: logData.time,
            model: logData.model,
            cost: logData.cost,
            status: logData.status || 'success',
            prompt_tokens: logData.prompt_tokens || 0,
            completion_tokens: logData.completion_tokens || 0,
            total_tokens: logData.total_tokens || 0
          });
        }
      }
      
      // Sort by time descending
      logs.sort((a, b) => new Date(b.time) - new Date(a.time));
      
      return logs;
    } catch (error) {
      console.error('Error fetching API requests:', error);
      return [];
    }
  }
}