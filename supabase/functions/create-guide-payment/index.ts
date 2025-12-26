import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: Record<string, unknown>) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-GUIDE-PAYMENT] ${step}${detailsStr}`);
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_EMAIL = 5;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 255;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    let supabase = null;
    if (supabaseUrl && supabaseServiceKey) {
      supabase = createClient(supabaseUrl, supabaseServiceKey);
    }

    const body = await req.json();
    const email = body?.email;
    
    // Input validation
    if (!email || typeof email !== "string") {
      logStep("ERROR", { message: "Email is required" });
      return new Response(JSON.stringify({ error: "Email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      logStep("ERROR", { message: "Email too long" });
      return new Response(JSON.stringify({ error: "Email address is too long" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      logStep("ERROR", { message: "Invalid email format" });
      return new Response(JSON.stringify({ error: "Invalid email address format" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    logStep("Request parsed and validated", { email: trimmedEmail });

    // Rate limiting check using payment_session_logs table
    if (supabase) {
      const cutoffTime = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
      
      const { count, error: countError } = await supabase
        .from("payment_session_logs")
        .select("*", { count: "exact", head: true })
        .eq("email", trimmedEmail)
        .gte("created_at", cutoffTime);

      if (!countError && count !== null && count >= MAX_REQUESTS_PER_EMAIL) {
        logStep("Rate limit exceeded", { email: trimmedEmail, count });
        return new Response(JSON.stringify({ error: "Too many payment attempts. Please try again later." }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 429,
        });
      }
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    let customerId;
    const customers = await stripe.customers.list({ email: trimmedEmail, limit: 1 });
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Create a one-time payment session for the Egg Optimisation Planning Guide
    // Configured for Hong Kong customers with HKD currency
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : trimmedEmail,
      line_items: [
        {
          price: "price_1ShtmDE3EwiYzazILEiBdb7e",
          quantity: 1,
        },
      ],
      mode: "payment",
      locale: "en",
      billing_address_collection: "required",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/fertility-guide?payment=success`,
      cancel_url: `${req.headers.get("origin")}/egg-freezing-surrogacy?payment=canceled`,
    });

    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    // Log session creation for audit trail and rate limiting
    if (supabase) {
      const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                       req.headers.get("cf-connecting-ip") || 
                       "unknown";
      
      await supabase.from("payment_session_logs").insert({
        email: trimmedEmail,
        session_id: session.id,
        ip_address: clientIp,
      });
      logStep("Session logged for audit", { sessionId: session.id });
    }

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
