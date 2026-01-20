import { ConfigService } from '../config/config.service.js';

export const resJSON = (d, s=200) => new Response(JSON.stringify(d), {status:s, headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'}});

export const DB = {
  get: async (env, k) => {
    if (!env.JASYSAI_KV) return null;
    return await env.JASYSAI_KV.get(k, {type:'json'});
  },
  set: async (env, k, v, ttl=null) => {
    if (!env.JASYSAI_KV) return null;
    return await env.JASYSAI_KV.put(k, JSON.stringify(v), ttl ? {expirationTtl: ttl} : {});
  },
  list: async (env, p) => {
    if (!env.JASYSAI_KV) return { keys: [] };
    return await env.JASYSAI_KV.list({prefix:p});
  },
  del: async (env, k) => {
    if (!env.JASYSAI_KV) return null;
    return await env.JASYSAI_KV.delete(k);
  }
};

export async function handleBilling(env, email, modelId, usage) {
  const mRes = await fetch('https://openrouter.ai/api/v1/models');
  const mData = await mRes.json();
  const model = mData.data.find(m => m.id === modelId);
  
  if (model) {
    const costUSD = (usage.prompt_tokens * (model.pricing.prompt || 0)) + (usage.completion_tokens * (model.pricing.completion || 0));
    const idrRate = await ConfigService.getIDRRate(env);
    const profitMargin = await ConfigService.getProfitMargin(env);
    const costIDR = costUSD * idrRate * profitMargin;
    
    const u = await DB.get(env, `u:${email}`);
    if (u) {
      // 1. Potong Saldo Utama
      u.credits -= costIDR;
      // 2. Catat Pemakaian (Usage Stats)
      const today = new Date().toISOString().split('T')[0];
      u.usage_daily = (u.usage_daily || {});
      u.usage_daily[today] = (u.usage_daily[today] || 0) + costIDR;
      u.total_used = (u.total_used || 0) + costIDR;

      await DB.set(env, `u:${email}`, u);
      
      // 3. Log Detail Admin - Include more detailed information
      const logData = {
        email,
        model: modelId,
        cost: costIDR,
        time: new Date().toISOString(),
        prompt_tokens: usage.prompt_tokens,
        completion_tokens: usage.completion_tokens,
        total_tokens: usage.prompt_tokens + usage.completion_tokens,
        status: 'success'
      };
      
      await DB.set(env, `log:${Date.now()}:${email}`, logData, 86400 * 30);
      return costIDR;
    }
  }
  return 0;
}