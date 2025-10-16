import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_LIVE!, { apiVersion: undefined });

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();

    const shippingFee = 10000;
    const line_items = [ ...cart.map((item: any) => ({
      price_data: {
        currency: 'mxn',
        product_data: { name: item.name },
        unit_amount: item.price, // in cents
      },
      quantity: 1,
    })),
    { price_data: {
        currency: 'mxn',
        product_data: { name: 'Shipping Fee' },
        unit_amount: shippingFee,
      },
      quantity: 1,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.url}/success`,
      cancel_url: `${req.url}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe API error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
