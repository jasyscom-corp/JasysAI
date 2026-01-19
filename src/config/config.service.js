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
      return settings || {
        guest_limit: 5,
        openrouter_key: '',
        midtrans_server_key: '',
        midtrans_client_key: '',
        midtrans_environment: 'sandbox', // 'sandbox' or 'production'
        guest_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
        user_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
      };
    } catch (error) {
      console.error('Error fetching settings:', error);
      return {
        guest_limit: 5,
        openrouter_key: '',
        midtrans_server_key: '',
        midtrans_client_key: '',
        midtrans_environment: 'sandbox',
        guest_models: ['openai/gpt-3.5-turbo', 'anthropic/claude-3-haiku', 'meta-llama/llama-3.1-8b-instruct'],
        user_models: ['openai/gpt-4', 'anthropic/claude-3-opus', 'openai/gpt-4-turbo', 'anthropic/claude-3-sonnet']
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
}