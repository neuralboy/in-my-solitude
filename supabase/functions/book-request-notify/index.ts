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
      from: 'Archive Desk <desk@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: '📚 New Book Request Detected',
      html: `
        <div style="font-family: serif; color: #0D0D0D; padding: 20px;">
          <h2 style="color: #BA993C; border-bottom: 1px solid #BA993C; padding-bottom: 10px;">Missing Volume Recommendation</h2>
          <p>A user is requesting a new volume for our collections.</p>
          <div style="background-color: #F8F8F8; padding: 20px; border-radius: 8px;">
            <p><strong>Title:</strong> ${record.title}</p>
            <p><strong>Author:</strong> ${record.author || 'Unknown'}</p>
            <p><strong>Justification:</strong> ${record.why}</p>
          </div>
          <p style="font-size: 11px; margin-top: 20px; color: #999;">User ID: ${record.user_id}</p>
        </div>
      `,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), { headers: { 'Content-Type': 'application/json' } });
});
