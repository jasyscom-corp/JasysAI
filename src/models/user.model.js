export class User {
  constructor(data = {}) {
    this.email = data.email || '';
    this.name = data.name || '';
    this.password = data.password || '';
    this.credits = data.credits || 0;
    this.api_keys = data.api_keys || [];
    this.created = data.created || new Date().toISOString();
    this.usage_daily = data.usage_daily || {};
    this.total_used = data.total_used || 0;
    this.unlocked_models = data.unlocked_models || [];
    this.role = data.role || 'user';
    this.last_login = data.last_login || null;
    this.is_active = data.is_active !== false;
    // Team management
    this.team = data.team || null; // Team ID if user is part of a team
    this.team_role = data.team_role || null; // 'owner', 'admin', 'member'
    // Billing information
    this.billing = data.billing || {
      payment_method: null,
      invoices: [],
      subscriptions: [],
      address: null
    };
    // Subscription plan
    this.subscription = data.subscription || null; // 'free', 'basic', 'pro', 'enterprise'
    this.subscription_status = data.subscription_status || 'active';
    this.subscription_end = data.subscription_end || null;
  }

  static create(userData) {
    return new User(userData);
  }

  static fromDB(data) {
    return new User(data);
  }

  toJSON() {
    return {
      email: this.email,
      name: this.name,
      credits: this.credits,
      api_keys: this.api_keys,
      created: this.created,
      usage_daily: this.usage_daily,
      total_used: this.total_used,
      unlocked_models: this.unlocked_models,
      role: this.role,
      last_login: this.last_login,
      is_active: this.is_active,
      team: this.team,
      team_role: this.team_role,
      billing: this.billing,
      subscription: this.subscription,
      subscription_status: this.subscription_status,
      subscription_end: this.subscription_end
    };
  }

  addApiKey(keyData) {
    this.api_keys.push({
      key: keyData.key,
      name: keyData.name,
      created: new Date().toISOString(),
      lastUsed: null
    });
  }

  removeApiKey(key) {
    this.api_keys = this.api_keys.filter(k => k.key !== key);
  }

  deductCredits(amount) {
    if (this.credits >= amount) {
      this.credits -= amount;
      this.total_used += amount;
      
      const today = new Date().toISOString().split('T')[0];
      this.usage_daily[today] = (this.usage_daily[today] || 0) + amount;
      
      return true;
    }
    return false;
  }

  addCredits(amount) {
    this.credits += amount;
  }

  unlockModel(modelId) {
    if (!this.unlocked_models.includes(modelId)) {
      this.unlocked_models.push(modelId);
    }
  }

  updateLastLogin() {
    this.last_login = new Date().toISOString();
  }

  getUsageStats() {
    const today = new Date().toISOString().split('T')[0];
    const todayUsage = this.usage_daily[today] || 0;
    
    return {
      totalCredits: this.credits,
      totalUsed: this.total_used,
      todayUsage,
      activeDays: Object.keys(this.usage_daily).length,
      apiKeysCount: this.api_keys.length,
      unlockedModelsCount: this.unlocked_models.length
    };
  }
}