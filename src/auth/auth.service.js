import { DB } from '../db/index.js';
import { ConfigService } from '../config/config.service.js';
import { jwtVerify, createRemoteJWKSet } from 'jose';

export class AuthService {
  static async authenticateUser(env, email, password) {
    const user = await DB.get(env, `u:${email}`);
    if (user && user.pass === password) {
      const token = 'usr_' + crypto.randomUUID().replace(/-/g,'');
      await DB.set(env, `sess:${token}`, { role: 'user', email }, 86400 * 7);
      return { ok: true, token, role: 'user' };
    }
    return { err: "Email atau Password Salah" };
  }

  static async authenticateAdmin(env, username, password) {
    const adminUser = await ConfigService.getAdminUser(env);
    const adminPass = await ConfigService.getAdminPass(env);
    
    if (username === adminUser && password === adminPass) {
      const token = 'adm_' + crypto.randomUUID().replace(/-/g,'');
      await DB.set(env, `sess:${token}`, { role: 'admin' }, 86400 * 7);
      return { ok: true, token, role: 'admin' };
    }
    return { err: "Invalid credentials" };
  }

  static async registerUser(env, email, password, name) {
    if (!email || !password || !name) return { err: "All fields required" };

    const existing = await DB.get(env, `u:${email}`);
    if (existing) return { err: "Email already registered" };

    const defaultCredits = await ConfigService.getDefaultCredits(env);
    
    const user = {
      email,
      name,
      pass: password,
      credits: defaultCredits,
      api_keys: [],
      created: new Date().toISOString(),
      usage_daily: {},
      total_used: 0,
      unlocked_models: []
    };

    await DB.set(env, `u:${email}`, user);
    const token = 'usr_' + crypto.randomUUID().replace(/-/g,'');
    await DB.set(env, `sess:${token}`, { role: 'user', email }, 86400 * 7);
    return { ok: true, token, role: 'user' };
  }

  static async validateSession(env, token) {
    return await DB.get(env, `sess:${token}`);
  }

  static async getUserByEmail(env, email) {
    return await DB.get(env, `u:${email}`);
  }

  static async validateCloudflareJWT(token) {
    try {
      const JWKS = createRemoteJWKSet(new URL('https://jasyscom-corp.cloudflareaccess.com/cdn-cgi/access/certs'));
      const { payload } = await jwtVerify(token, JWKS, {
        audience: 'fb4edbe0d8eb099744a689420cd953b8f04f922e37c6a54699a49643adf5aabc',
        issuer: 'https://jasyscom-corp.cloudflareaccess.com'
      });
      return { ok: true, payload };
    } catch (error) {
      return { err: 'Invalid JWT', details: error.message };
    }
  }
}