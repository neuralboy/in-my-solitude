import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

// In a real environment, you'd fetch the user's email from the profile or auth tables.
// For this Edge Function demo, we'll use a placeholder variable.

Deno.serve(async (req) => {
  const { record, old_record } = await req.json();
  
  if (!record || record.status === old_record?.status) return new Response('No change in status', { status: 200 });

  const status = record.status;
  const isApproved = status === 'approved';

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'The Curator <archive@solitude.dev>',
      to: ['user@example.com'], // In production, this'd be dynamically mapped.
      subject: isApproved ? '🔓 Entry Granted' : '🛡️ Access Request Update',
      html: `
        <div style="font-family: serif; color: #0D0D0D; padding: 30px; background-color: #FAFAFA;">
          <h1 style="color: ${isApproved ? '#10B981' : '#991B1B'}; letter-spacing: 0.1em; text-transform: uppercase;">
             ${isApproved ? 'Admission Granted' : 'Admission Deferred'}
          </h1>
          <hr style="border: 0.5px solid #E5E5E5; margin: 20px 0;" />
          <p style="font-size: 16px; font-style: italic; color: #666;"> Regarding the volume: <strong>${record.book_id}</strong> </p>
          <p style="line-height: 1.6; margin-top: 30px;">
             ${isApproved 
                ? 'Your request has been personally reviewed and accepted. You may now access the restricted volume in your archive profile for the next 7 moon-cycles.' 
                : 'After reviewing your request, the curator has decided to defer your admission to these stacks at this time. Readiness and context are essential for the knowledge contained within.'}
          </p>
          <p style="margin-top: 40px; border-top: 1px solid #EEE; padding-top: 10px; color: #BBB; font-size: 11px;">
             In Solidarity,<br/>The Curator
          </p>
        </div>
      `,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), { headers: { 'Content-Type': 'application/json' } });
});
