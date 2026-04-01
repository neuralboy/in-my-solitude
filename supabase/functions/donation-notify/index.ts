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
      from: 'Archive Intake <donations@resend.dev>',
      to: [ADMIN_EMAIL],
      subject: '📦 New Donation Submitted',
      html: `
        <div style="font-family: serif; color: #0D0D0D; padding: 20px;">
          <h2 style="color: #10B981;">Archival Contribution Received</h2>
          <p>A new volume donation has been submitted and is ready for review.</p>
          <div style="background-color: #F8F8F8; padding: 20px; border-radius: 8px;">
            <p><strong>Title:</strong> ${record.title}</p>
            <p><strong>Author:</strong> ${record.author || 'Unknown'}</p>
            <p><strong>Category:</strong> ${record.category}</p>
            <p><strong>Notes:</strong> ${record.note}</p>
          </div>
          <p style="font-size: 11px; margin-top: 20px; color: #999;">User ID: ${record.user_id}</p>
          <p style="font-style: italic; color: #666; font-size: 13px;">Review quality and metadata in the console before publishing.</p>
        </div>
      `,
    }),
  });

  return new Response(JSON.stringify({ success: res.ok }), { headers: { 'Content-Type': 'application/json' } });
});
