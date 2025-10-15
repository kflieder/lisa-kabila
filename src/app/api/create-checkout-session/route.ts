import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE!, { apiVersion: undefined });

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: '50 Cent Product' },
            unit_amount: 50,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.url}/success`,
      cancel_url: `${req.url}/cancel`,
    });

    // Return the session URL instead of sessionId
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
