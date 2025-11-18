import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

// Product data (previously from Prismic)
const PRODUCT_DATA = {
  vapor75: {
    name: "Vapor75 Keyboard",
    price: 9999, // Price in cents ($99.99)
    description:
      "Premium 75% mechanical keyboard with aluminum construction, hot-swappable switches, and RGB backlighting.",
    image: "/item_3.png",
  },
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ uid: string }> },
) {
  try {
    const { uid } = await params;

    if (!uid) {
      return NextResponse.json(
        { error: "Missing Product UID" },
        { status: 400 },
      );
    }

    const product = PRODUCT_DATA[uid as keyof typeof PRODUCT_DATA];

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const { name, price, description, image } = product;

    // Convert relative image path to absolute URL for Stripe
    const origin = request.headers.get("origin") || "http://localhost:3000";
    const absoluteImageUrl = image?.startsWith("http")
      ? image
      : `${origin}${image}`;

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: name,
              ...(description ? { description: description } : {}),
              ...(image ? { images: [absoluteImageUrl] } : {}),
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
    };
    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
