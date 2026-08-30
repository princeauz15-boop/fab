import { NextRequest, NextResponse } from 'next/server';

const WP_BASE = 'https://dev-fab-paper-tube.pantheonsite.io';
const FORM_ID_MAIN = 1144;

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

    // Server-side validation
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

    // Build FormData matching EXACT CF7 field names from the WordPress form template
    // Field names visible in the email: your-company, product-type, quantity, tel-phone
    const fd = new FormData();
    fd.append('your-name',     body.name.trim());
    fd.append('your-email',    body.email?.trim() ?? '');
    fd.append('tel-phone',     body.phone.trim());
    fd.append('your-company',  body.company?.trim() ?? '');
    fd.append('product-type',  body.product?.trim() ?? '');
    fd.append('quantity',      body.quantity?.trim() ?? '');
    fd.append('your-message',  body.message.trim());

    // Required CF7 unit tag
    fd.append('_wpcf7_unit_tag', `wpcf7-f${formId}-p0-o1`);

    const cf7Url = `${WP_BASE}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

    const cf7Res = await fetch(cf7Url, {
      method: 'POST',
      body: fd,
    });

    const cf7Data = await cf7Res.json() as { status: string; message: string };

    if (cf7Data.status === 'mail_sent') {
      return NextResponse.json({ ok: true, message: cf7Data.message });
    }

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
