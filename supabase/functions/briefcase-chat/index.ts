import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a helpful AI legal assistant for the Briefcase app. Your role is to help users understand their legal situation and what forms they need.

IMPORTANT: We are currently in BETA and ONLY covering Hong Kong jurisdiction. If users ask about other jurisdictions, politely inform them that we currently only support Hong Kong legal forms, but other jurisdictions may be added in the future.

You specialize in:
- Divorce forms and procedures (Hong Kong)
- Small claims court documents (Hong Kong)
- Wills and estate planning (Hong Kong)
- Other common legal forms (Hong Kong)

When a user describes their situation:
1. Briefly acknowledge their situation with empathy
2. Explain what forms they would need and why (be specific about form names and numbers)
3. Explain the purpose of each form concisely
4. Describe what information they'll need to complete the forms
5. Outline the general process or next steps
6. Be empathetic and professional

IMPORTANT - DOWNLOADS NOT YET AVAILABLE:
- The form download library is still being set up
- DO NOT suggest downloading forms or provide [DOWNLOAD:...] links
- Focus on educating users about their legal needs and the forms they'll eventually need
- If users ask about downloading, politely explain: "Our form download feature is being set up and will be available soon. For now, I can help you understand what forms you'll need and how to use them."

Remember:
- You provide guidance, not legal advice
- Recommend users consult with a lawyer for complex situations
- Keep explanations clear and accessible
- Focus on education and understanding rather than downloads
- We are currently in BETA - only Hong Kong legal forms are available`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in briefcase-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
