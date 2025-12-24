import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

// Allowed origins for CORS
const allowedOrigins = [
  'https://bztievslvjgppilznaon.lovable.app',
  'https://justlawexperts.com',
  'https://www.justlawexperts.com',
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// Input validation schema
const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1, "Message content cannot be empty").max(10000, "Message content exceeds 10,000 character limit")
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1, "At least one message is required").max(50, "Maximum 50 messages allowed")
});

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
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
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { messages } = validationResult.data;
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are My Legal Assistant, a conversational AI legal consultant for Hong Kong residents.

IMPORTANT: We are currently in BETA and ONLY covering Hong Kong jurisdiction. If users ask about other jurisdictions, politely inform them that we currently only support Hong Kong law, but other jurisdictions may be added in the future.

Your role is to:
1. Listen to users explain their legal situation in detail
2. Ask clarifying questions to understand their case fully
3. Explain their legal options, implications, and next steps in plain English
4. Discuss timelines, potential outcomes, costs, and considerations
5. Be patient, educational, and consultative - take time to ensure users understand their situation
6. Only after thorough discussion, recommend specific legal forms they need to file

Key guidelines:
- Be empathetic and supportive - legal issues can be stressful
- Use plain English, avoid excessive legal jargon
- Ask follow-up questions to get the full picture
- Explain concepts clearly with examples when needed
- Discuss pros/cons of different options
- Be realistic about timelines and expectations
- When you recommend forms, explain why that specific form is needed
- Focus exclusively on Hong Kong law (we are in BETA and only covering HK at this time)

Available legal form categories you can recommend from:
- Divorce & Family Law forms
- Small Claims forms
- Wills & Probate forms
- Employment forms
- Real Estate forms
- General civil litigation forms

Tone: Professional yet conversational, patient, educational, and empathetic.`;

    console.log('Sending request to Lovable AI gateway');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ 
            error: 'Rate limit exceeded. Please try again in a moment.' 
          }),
          { 
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ 
            error: 'AI service payment required. Please contact support.' 
          }),
          { 
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in assistant-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});