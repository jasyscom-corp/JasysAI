import { MidtransService } from '../payment/midtrans.service.js';
import { DB } from '../db/index.js';

export async function paymentRoutes(request, env) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Create payment token
  if (path === '/api/payment/create' && method === 'POST') {
    const { packageId, email } = await request.json();
    
    // Get user
    const user = await DB.get(env, `u:${email}`);
    if (!user) {
      return new Response(JSON.stringify({ err: 'User not found' }), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Get package details (from CONFIG or DB)
    const packages = [
      { id: 'basic', name: 'Basic Package', price: 25000 },
      { id: 'premium', name: 'Premium Package', price: 50000 },
      { id: 'ultimate', name: 'Ultimate Package', price: 100000 }
    ];

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) {
      return new Response(JSON.stringify({ err: 'Package not found' }), { 
        status: 404, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }

    // Create order ID
    const orderId = `order_${email}_${Date.now()}`;

    // Create snap token
    const customerDetails = {
      first_name: user.name,
      email: user.email
    };

    const result = await MidtransService.createSnapToken(env, orderId, pkg.price, customerDetails);

    if (result.ok) {
      // Save payment info to DB
      const paymentInfo = {
        order_id: orderId,
        package_id: packageId,
        email: user.email,
        amount: pkg.price,
        status: 'pending',
        created_at: new Date().toISOString()
      };

      await DB.set(env, `payment:${orderId}`, paymentInfo);

      return new Response(JSON.stringify({ 
        ok: true, 
        token: result.token, 
        redirect_url: `https://app.sandbox.midtrans.com/snap/v2/vtweb/${result.token}` 
      }), { 
        headers: { 'Content-Type': 'application/json' } 
      });
    } else {
      return new Response(JSON.stringify(result), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
  }

  // Midtrans webhook
  if (path === '/api/payment/webhook' && method === 'POST') {
    try {
      const notification = await request.json();
      
      // Verify notification
      const result = await MidtransService.verifyNotification(env, notification);
      
      if (result.ok) {
        const { order_id, transaction_status, gross_amount } = result.data;

        // Get payment info
        const paymentInfo = await DB.get(env, `payment:${order_id}`);
        
        if (paymentInfo) {
          // Update payment status
          const status = MidtransService.getPaymentStatus(transaction_status);
          paymentInfo.status = status;
          paymentInfo.transaction_status = transaction_status;
          paymentInfo.updated_at = new Date().toISOString();

          await DB.set(env, `payment:${order_id}`, paymentInfo);

          // If payment successful, add credits to user
          if (status === 'success') {
            const user = await DB.get(env, `u:${paymentInfo.email}`);
            if (user) {
              // Add credits based on package price
              // Assuming 1 IDR = 1 credit
              user.credits += paymentInfo.amount;
              await DB.set(env, `u:${paymentInfo.email}`, user);

              // Unlock models based on package
              if (paymentInfo.package_id === 'basic') {
                if (!user.unlocked_models.includes('openai/gpt-4')) {
                  user.unlocked_models.push('openai/gpt-4');
                  await DB.set(env, `u:${paymentInfo.email}`, user);
                }
              } else if (paymentInfo.package_id === 'premium') {
                if (!user.unlocked_models.includes('openai/gpt-4')) {
                  user.unlocked_models.push('openai/gpt-4');
                }
                if (!user.unlocked_models.includes('anthropic/claude-3-opus')) {
                  user.unlocked_models.push('anthropic/claude-3-opus');
                }
                await DB.set(env, `u:${paymentInfo.email}`, user);
              } else if (paymentInfo.package_id === 'ultimate') {
                if (!user.unlocked_models.includes('openai/gpt-4')) {
                  user.unlocked_models.push('openai/gpt-4');
                }
                if (!user.unlocked_models.includes('anthropic/claude-3-opus')) {
                  user.unlocked_models.push('anthropic/claude-3-opus');
                }
                if (!user.unlocked_models.includes('openai/gpt-4-turbo')) {
                  user.unlocked_models.push('openai/gpt-4-turbo');
                }
                await DB.set(env, `u:${paymentInfo.email}`, user);
              }
            }
          }

          return new Response(JSON.stringify({ ok: true, message: 'Notification processed' }), { 
            headers: { 'Content-Type': 'application/json' } 
          });
        } else {
          return new Response(JSON.stringify({ ok: false, message: 'Payment not found' }), { 
            status: 404, 
            headers: { 'Content-Type': 'application/json' } 
          });
        }
      } else {
        return new Response(JSON.stringify(result), { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
    } catch (error) {
      console.error('Webhook error:', error);
      return new Response(JSON.stringify({ err: 'Internal server error' }), { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      });
    }
  }

  return new Response('Not Found', { status: 404 });
}