import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are My Legal Assistant, a conversational AI legal consultant for Hong Kong residents and common law jurisdictions.

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
- Focus on Hong Kong law primarily, but can discuss other common law jurisdictions (UK, Ireland, Australia, Canada, US)

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
        error: error.message || 'An unexpected error occurred' 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
