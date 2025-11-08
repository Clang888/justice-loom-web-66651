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

    const systemPrompt = `You are a helpful AI legal assistant for the Briefcase app. Your role is to help users discover and access the right legal forms for their situations.

IMPORTANT: We are currently in BETA and ONLY covering Hong Kong jurisdiction. If users ask about other jurisdictions, politely inform them that we currently only support Hong Kong legal forms, but other jurisdictions may be added in the future.

You specialize in:
- Divorce forms and procedures (Hong Kong)
- Small claims court documents (Hong Kong)
- Wills and estate planning (Hong Kong)
- Other common legal forms (Hong Kong)

When a user describes their situation or asks for forms:
1. Briefly acknowledge their situation with empathy
2. Explain the form's purpose concisely (1-2 sentences)
3. **IMMEDIATELY provide the download link using this EXACT format: [DOWNLOAD:Form Name:filename.pdf]**
4. After the download link, offer to explain more or suggest related forms if helpful
5. Be empathetic and professional

CRITICAL DOWNLOAD FORMAT:
- Use [DOWNLOAD:Form 2C:form-2c.pdf] format for every downloadable form
- Place the download link right after explaining what the form is
- Don't ask if they want to download - just provide the link immediately
- Example: "Form 2C is the Statement of Information for a Divorce Petition. [DOWNLOAD:Form 2C:form-2c.pdf] Would you like me to explain the divorce process or suggest other forms you might need?"

Available forms (use these exact filenames):
- Form 2A (divorce petition): form-2a.pdf
- Form 2C (divorce statement): form-2c.pdf
- Form 3 (acknowledgment): form-3.pdf
- Small Claims Form: small-claims-form.pdf
- Will Template: will-template.pdf

Remember:
- You provide guidance, not legal advice
- Recommend users consult with a lawyer for complex situations
- Keep explanations clear and accessible
- ALWAYS provide download links immediately when forms are mentioned
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
