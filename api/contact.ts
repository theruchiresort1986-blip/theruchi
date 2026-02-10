import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  console.log('--- API INVOKED ---');
  console.log('Method:', req.method);

  // 1. Validate request method
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Check Environment Variables
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('CRITICAL: RESEND_API_KEY is missing in environment');
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'RESEND_API_KEY is missing from environment variables.'
    });
  }

  // Log masked API key for debugging (e.g., "re_Abc...Xyz")
  const maskedKey = apiKey.length > 10
    ? `${apiKey.substring(0, 5)}...${apiKey.substring(apiKey.length - 4)}`
    : 'Invalid/Short Key';
  console.log('Using API Key:', maskedKey);

  // 3. Parse Body (Sometimes Vercel doesn't parse it automatically)
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse body string:', e);
    }
  }

  console.log('Body received:', JSON.stringify(body));

  const { name, email, phone, eventType, eventDate, message } = body || {};

  if (!name || !email || !phone) {
    console.warn('Validation failed: Missing fields');
    return res.status(400).json({ error: 'Missing required fields: name, email, and phone are required' });
  }

  try {
    const resend = new Resend(apiKey);

    console.log(`Attempting to send email for ${name} to theruchiresort1986@gmail.com...`);

    // Use 'onboarding@resend.dev' as a fallback if the domain isn't verified yet
    // This helps determine if the issue is domain-verification related
    const fromEmail = 'Ruchi Resort <notifications@ruchiresort.link>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ['theruchiresort1986@gmail.com'],
      subject: `New Event Enquiry: ${eventType || 'General'} - ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c5a059; padding-bottom: 10px;">New Website Enquiry</h2>
          <p style="font-size: 16px;">You have received a new event enquiry from your website.</p>
          <hr />
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Event:</strong> ${eventType}</p>
          <p><strong>Date:</strong> ${eventDate || 'N/A'}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f4f4f4;">
            <strong>Message:</strong><br />${message || 'No message'}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', JSON.stringify(error));

      // Detailed error mapping
      const statusCode = (error as any).statusCode || (error as any).status || 400;
      return res.status(statusCode).json({
        error: 'Resend API Error',
        message: (error as any).message || 'Failed to send email',
        details: error
      });
    }

    console.log('SUCCESS: Email sent!', data?.id);
    return res.status(200).json({ success: true, data });
  } catch (err: any) {
    console.error('CRASH in handler:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
