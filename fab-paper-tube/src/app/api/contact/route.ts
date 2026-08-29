import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = 'https://dev-fab-paper-tube.pantheonsite.io';

// CF7 form IDs — update if you create a second form
const FORM_ID_MAIN = 1144;   // "About page Contact Form" shown in your screenshot

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name: string;
      email?: string;
      phone: string;
      company?: string;
      product?: string;
      quantity?: string;
      message: string;
      formId?: number;
    };

    // Basic server-side validation
    if (!body.name?.trim()) {
      return NextResponse.json({ ok: false, message: 'Name is required.' }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ ok: false, message: 'Phone number is required.' }, { status: 400 });
    }
    if (!body.message?.trim()) {
      return NextResponse.json({ ok: false, message: 'Message / requirement is required.' }, { status: 400 });
    }

    const formId = body.formId ?? FORM_ID_MAIN;

    // Build the CF7 subject line that includes all key info
    const subject = `New Enquiry from ${body.name}${body.company ? ` (${body.company})` : ''} — FAB Paper Tube Website`;

    // Build the full message body for the "your-message" field
    const fullMessage = [
      body.message,
      '',
      '--- Additional Details ---',
      body.product  ? `Product Type : ${body.product}` : '',
      body.quantity ? `Quantity     : ${body.quantity}` : '',
      body.company  ? `Company      : ${body.company}` : '',
      body.phone    ? `Phone        : ${body.phone}` : '',
      body.email    ? `Email        : ${body.email}` : '',
    ].filter(Boolean).join('\n');

    // Build FormData matching the CF7 field names from your screenshot:
    // your-name, your-email, your-phone, your-subject, your-message
    const fd = new FormData();
    fd.append('your-name',    body.name.trim());
    fd.append('your-email',   body.email?.trim() ?? '');
    fd.append('tel-phone',    body.phone.trim());       // CF7 tel field name
    fd.append('your-subject', subject);
    fd.append('your-message', fullMessage);
    // Honeypot field — leave blank to pass spam check
    fd.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

    const cf7Url = `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

    const cf7Res = await fetch(cf7Url, {
      method: 'POST',
      body: fd,
      // Do NOT set Content-Type — let fetch set it with boundary for FormData
    });

    const cf7Data = await cf7Res.json() as { status: string; message: string };

    // CF7 returns status "mail_sent" on success
    if (cf7Data.status === 'mail_sent') {
      return NextResponse.json({ ok: true, message: cf7Data.message });
    }

    // CF7 returns "validation_failed", "mail_failed", "spam", etc. on error
    console.error('[CF7] submission failed:', cf7Data);
    return NextResponse.json(
      { ok: false, message: cf7Data.message || 'Submission failed. Please try again.' },
      { status: 422 }
    );

  } catch (err) {
    console.error('[contact/route] error:', err);
    return NextResponse.json(
      { ok: false, message: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }
}
