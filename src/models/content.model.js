import { DB } from '../db/index.js';

export class ContentModel {
  static async get(env, key) {
    try {
      const content = await DB.get(env, `content:${key}`);
      return content || { title: '', content: '', last_updated: null };
    } catch (error) {
      console.error('Error getting content:', error);
      return { title: '', content: '', last_updated: null };
    }
  }

  static async set(env, key, data) {
    try {
      const content = {
        title: data.title || '',
        content: data.content || '',
        last_updated: new Date().toISOString(),
        updated_by: data.updated_by || 'admin'
      };
      await DB.set(env, `content:${key}`, content);
      return { ok: true };
    } catch (error) {
      console.error('Error setting content:', error);
      return { ok: false, err: error.message };
    }
  }

  static async getAll(env) {
    try {
      const keys = [
        'about',
        'blog', 
        'contact',
        'privacy_policy',
        'terms_of_service',
        'security'
      ];
      
      const content = {};
      for (const key of keys) {
        content[key] = await this.get(env, key);
      }
      
      return { ok: true, data: content };
    } catch (error) {
      console.error('Error getting all content:', error);
      return { ok: false, err: error.message };
    }
  }

  static async delete(env, key) {
    try {
      await DB.del(env, `content:${key}`);
      return { ok: true };
    } catch (error) {
      console.error('Error deleting content:', error);
      return { ok: false, err: error.message };
    }
  }
}