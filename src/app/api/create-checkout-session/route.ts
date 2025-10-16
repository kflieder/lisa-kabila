import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, {
  apiVersion: undefined,
});

export async function POST(req: NextRequest) {
  try {
    const { cart, shippingFee } = await req.json();

    const line_items = [
      ...cart.map((item: any) => ({
        price_data: {
          currency: "mxn",
          product_data: { name: item.name },
          unit_amount: item.price, // in cents
        },
        quantity: 1,
      })),
      {
        price_data: {
          currency: "mxn",
          product_data: { name: "Shipping Fee" },
          unit_amount: parseInt(shippingFee),
        },
        quantity: 1,
      },
    ];

    const baseUrlCancel = "https://lisa-kabila.vercel.app";
    const baseUrlSuccess = "https://lisa-kabila.vercel.app/success";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["MX", "US"],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${baseUrlSuccess}/?success=true`,
      cancel_url: `${baseUrlCancel}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
