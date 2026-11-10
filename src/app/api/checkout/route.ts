import { NextResponse } from "next/server";
import Stripe from "stripe";
import { TUNA_PRICE_PER_KG_MXN } from "@/lib/tuna";

// 30% deposit on published boat rates (USD cents)
const TRIPS = {
  half: { price: 70000, name: "Half Day Charter" },
  full: { price: 120000, name: "Full Day Charter" },
} as const;

export async function POST(request: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Payments are not configured yet." },
      { status: 503 }
    );
  }

  const stripe = new Stripe(key);
  const body = await request.json();
  const lang = body.lang === "es" ? "es" : "en";
  const origin0 = request.headers.get("origin") ?? "https://www.cowtunas.com";

  // Vacuum-packed tuna by the kilo (full payment, no deposit)
  if (body.product === "tuna") {
    const kg = Number(body.kg);
    if (!Number.isInteger(kg) || kg < 1 || kg > 50) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: typeof body.email === "string" && body.email ? body.email : undefined,
      line_items: [
        {
          price_data: {
            currency: "mxn",
            product_data: {
              name:
                lang === "es"
                  ? "Atún Aleta Amarilla Empacado al Vacío"
                  : "Vacuum-Packed Yellowfin Tuna",
              description:
                lang === "es"
                  ? "Precio por kilo. Envío a domicilio incluido en Los Cabos."
                  : "Price per kilo. Free home delivery in Los Cabos.",
            },
            unit_amount: TUNA_PRICE_PER_KG_MXN * 100,
          },
          quantity: kg,
        },
      ],
      metadata: { product: "tuna", kg: String(kg) },
      success_url: `${origin0}/${lang}/tuna?order=paid`,
      cancel_url: `${origin0}/${lang}/tuna?order=cancelled`,
    });
    return NextResponse.json({ url: session.url });
  }

  const trip = TRIPS[body.trip as keyof typeof TRIPS];
  if (!trip) {
    return NextResponse.json({ error: "Unknown trip type." }, { status: 400 });
  }
  const deposit = Math.round(trip.price * 0.3);
  const origin = request.headers.get("origin") ?? "https://cowtunas.vercel.app";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: typeof body.email === "string" && body.email ? body.email : undefined,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name:
              lang === "es"
                ? `Depósito 30% — ${trip.name === "Half Day Charter" ? "Charter Medio Día" : "Charter Día Completo"}`
                : `30% Deposit — ${trip.name}`,
            description:
              lang === "es"
                ? "El saldo se paga el día del viaje en la Marina de Cabo San Lucas."
                : "Balance due on the day of your trip at the Cabo San Lucas Marina.",
          },
          unit_amount: deposit,
        },
        quantity: 1,
      },
    ],
    metadata: {
      booking_date: String(body.tripDate ?? ""),
      anglers: String(body.anglers ?? ""),
      trip: String(body.trip),
    },
    success_url: `${origin}/${lang}?deposit=paid`,
    cancel_url: `${origin}/${lang}?deposit=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
