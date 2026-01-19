export class MidtransService {
  static async createSnapToken(env, orderId, amount, customerDetails) {
    const { ConfigService } = await import('../config/config.service.js');
    const settings = await ConfigService.getAllSettings(env);
    
    const serverKey = settings.midtrans_server_key || env.MIDTRANS_SERVER_KEY;
    const isProduction = settings.midtrans_environment === 'production' || env.ENVIRONMENT === 'production';
    
    const url = isProduction 
      ? 'https://app.midtrans.com/snap/v1/transactions'
      : 'https://app.sandbox.midtrans.com/snap/v1/transactions';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(serverKey + ':')}`
    };

    const body = JSON.stringify({
      transaction_details: {
        order_id: orderId,
        gross_amount: amount
      },
      customer_details: customerDetails,
      item_details: [
        {
          id: 'package',
          price: amount,
          quantity: 1,
          name: 'AI Package'
        }
      ]
    });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });

      const data = await response.json();
      
      if (response.ok) {
        return { ok: true, token: data.token };
      } else {
        return { err: data.message || 'Failed to create snap token' };
      }
    } catch (error) {
      console.error('Midtrans API error:', error);
      return { err: 'Connection error' };
    }
  }

  static async verifyNotification(env, notification) {
    const { ConfigService } = await import('../config/config.service.js');
    const settings = await ConfigService.getAllSettings(env);
    
    const serverKey = settings.midtrans_server_key || env.MIDTRANS_SERVER_KEY;
    const isProduction = settings.midtrans_environment === 'production' || env.ENVIRONMENT === 'production';
    
    const url = isProduction 
      ? 'https://api.midtrans.com/v2/notification/verify'
      : 'https://api.sandbox.midtrans.com/v2/notification/verify';

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(serverKey + ':')}`
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(notification)
      });

      const data = await response.json();
      
      if (response.ok) {
        return { ok: true, data };
      } else {
        return { err: data.message || 'Failed to verify notification' };
      }
    } catch (error) {
      console.error('Midtrans verification error:', error);
      return { err: 'Connection error' };
    }
  }

  static getPaymentStatus(status) {
    const statusMap = {
      'capture': 'success',
      'settlement': 'success',
      'pending': 'pending',
      'deny': 'failed',
      'cancel': 'failed',
      'expire': 'failed'
    };

    return statusMap[status] || 'unknown';
  }
}