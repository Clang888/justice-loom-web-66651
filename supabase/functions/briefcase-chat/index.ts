import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, "Message content cannot be empty").max(10000, "Message content exceeds 10,000 character limit")
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1, "At least one message is required").max(50, "Maximum 50 messages allowed")
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = requestSchema.safeParse(body);
    if (!validationResult.success) {
      console.error('Input validation failed:', validationResult.error.issues);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: validationResult.error.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message
          }))
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { messages } = validationResult.data;
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
3. **IMMEDIATELY provide the download link using this EXACT format: [DOWNLOAD:Form Name:form_number]**
4. After the download link, offer to explain more or suggest related forms if helpful
5. Be empathetic and professional

CRITICAL DOWNLOAD FORMAT:
- Use [DOWNLOAD:Form 2C:2C] format where the second part is the form number
- Place the download link right after explaining what the form is
- Don't ask if they want to download - just provide the link immediately
- Example: "Form 2C is the Statement of Information for a Divorce Petition. [DOWNLOAD:Form 2C:2C] Would you like me to explain the divorce process or suggest other forms you might need?"

Common form numbers to reference:
- Form 2A (divorce petition): 2A
- Form 2C (divorce statement): 2C
- Form 3 (acknowledgment): 3
- Small Claims forms: SC1, SC2, etc.
- Will forms: WILL1, etc.

Note: When users mention a form number (like "form 2c" or "2C"), use that exact number in the download format.

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