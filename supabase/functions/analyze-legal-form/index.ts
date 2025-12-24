import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get the file from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Processing file: ${file.name}, size: ${file.size} bytes`);

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Extract text from PDF using pdf-parse
    // Note: Using dynamic import for npm modules
    const { default: pdfParse } = await import('npm:pdf-parse@1.1.1');
    
    let pdfText = '';
    try {
      const data = await pdfParse(uint8Array);
      pdfText = data.text;
      console.log(`Extracted ${pdfText.length} characters from PDF`);
    } catch (error) {
      console.error('PDF parsing error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to extract text from PDF' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!pdfText || pdfText.trim().length < 10) {
      return new Response(
        JSON.stringify({ 
          error: 'Could not extract sufficient text from PDF. The file may be image-based or empty.' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Use Lovable AI to analyze the document and extract metadata
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are an expert legal document analyzer. Extract metadata from legal forms accurately. 
Categories should be one of: Divorce, Small Claims, Wills, Employment, Real Estate, Family Law, Business, Immigration, Other.
Be precise and concise in descriptions.`
          },
          {
            role: 'user',
            content: `Analyze this legal form and extract its metadata:\n\n${pdfText.slice(0, 8000)}`
          }
        ],
        tools: [{
          type: 'function',
          function: {
            name: 'extract_form_metadata',
            description: 'Extract structured metadata from a legal form document',
            parameters: {
              type: 'object',
              properties: {
                form_name: {
                  type: 'string',
                  description: 'The official title of the form (from header or title)'
                },
                form_number: {
                  type: 'string',
                  description: 'The official form number or reference code (if present)'
                },
                category: {
                  type: 'string',
                  enum: ['Divorce', 'Small Claims', 'Wills', 'Employment', 'Real Estate', 'Family Law', 'Business', 'Immigration', 'Other'],
                  description: 'The legal category this form belongs to'
                },
                description: {
                  type: 'string',
                  description: 'A concise 1-2 sentence description of what this form is used for'
                },
                keywords: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of 5-10 relevant search keywords'
                },
                common_scenarios: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Array of 3-5 common scenarios when this form would be used'
                }
              },
              required: ['form_name', 'category', 'description', 'keywords', 'common_scenarios'],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { 
          type: 'function', 
          function: { name: 'extract_form_metadata' } 
        }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { 
            status: 429, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { 
            status: 402, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI response received:', JSON.stringify(aiData));

    // Extract the tool call result
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall || !toolCall.function?.arguments) {
      throw new Error('No metadata extracted from AI response');
    }

    const metadata = JSON.parse(toolCall.function.arguments);
    console.log('Extracted metadata:', JSON.stringify(metadata));

    return new Response(
      JSON.stringify({ 
        success: true,
        metadata: {
          form_name: metadata.form_name || 'Untitled Form',
          form_number: metadata.form_number || null,
          category: metadata.category || 'Other',
          description: metadata.description || null,
          keywords: metadata.keywords || [],
          common_scenarios: metadata.common_scenarios || []
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in analyze-legal-form:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
