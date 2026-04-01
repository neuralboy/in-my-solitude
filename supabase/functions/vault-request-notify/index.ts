import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL');

Deno.serve(async (req) => {
  const { record } = await req.json();
  
  if (!record) return new Response('No record found', { status: 400 });

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: 'In My Solitude <notifications@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: '📜 New Vault Access Request',
      html: `
        <div style="font-family: serif; color: #0D0D0D; padding: 20px;">
          <h2 style="color: #C9A84C;">Archive Solicitation</h2>
          <p>A wanderer is seeking entry into the restricted stacks.</p>
          <hr style="border: 0.5px solid #2A2A2A;" />
          <p><strong>Solicitor ID:</strong> ${record.user_id}</p>
          <p><strong>Requested Volume:</strong> ${record.book_id}</p>
          <p><strong>Intent:</strong> ${record.reason}</p>
          <p style="font-style: italic; color: #9A9088; margin-top: 20px;">Please review the console to grant or deny admission.</p>
        </div>
      `,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
