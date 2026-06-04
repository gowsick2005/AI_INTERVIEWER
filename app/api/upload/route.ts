import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const webhookUrl =
    process.env.N8N_WEBHOOK_URL ||
    process.env.NEXT_PUBLIC_N8N_WEBHOOK ||
    'https://succesgm01.app.n8n.cloud/webhook/resume-upload';

  if (!webhookUrl) {
    return NextResponse.json({ error: 'N8N webhook URL is not configured.' }, { status: 500 });
  }

  try {
    const incoming = await request.formData();
    const upload = new FormData();
    const file = incoming.get('file') ?? incoming.get('resume');
    if (file) {
      const filename = typeof file === 'object' && 'name' in file ? (file as File).name : 'resume.pdf';
      upload.append('file', file as Blob, filename);
      upload.append('resume', file as Blob, filename);
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: upload,
    });

    const responseText = await response.text();
    const contentType = response.headers.get('content-type') || '';
    let body: any = responseText;

    if (contentType.includes('application/json')) {
      body = JSON.parse(responseText);
    }

    console.log("========================================");
    console.log("N8N WEBHOOK RESPONSE STATUS:", response.status);
    console.log("N8N WEBHOOK RESPONSE BODY TYPE:", typeof body);
    console.log("N8N WEBHOOK RESPONSE BODY:", JSON.stringify(body, null, 2));
    console.log("========================================");

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'N8N webhook error',
          status: response.status,
          statusText: response.statusText,
          details: body,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("FORWARD UPLOAD TO N8N ERROR:", error);
    return NextResponse.json({ error: 'Failed to forward upload to N8N', details: String(error) }, { status: 500 });
  }
}
