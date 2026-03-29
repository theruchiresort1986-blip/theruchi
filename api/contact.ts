import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  console.log('--- API INVOKED ---');
  console.log('Method:', req.method);

  // 1. Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Check Environment Variables
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_RECIPIENT || 'theruchiresort1986@gmail.com';

  if (!apiKey) {
    console.error('CRITICAL: RESEND_API_KEY is missing in environment');
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'RESEND_API_KEY is missing from environment variables.'
    });
  }

  // 3. Parse Body
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      console.error('Failed to parse body string:', e);
    }
  }

  const { name, email, phone, eventType, eventDate, message } = body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, and phone are required' });
  }

  try {
    const resend = new Resend(apiKey);

    // Using a verified domain email as primary, but we'll try to handle verification issues
    // Note: 'onboarding@resend.dev' can only send to the email associated with the Resend account.
    const fromEmail = 'Ruchi Resort <notifications@ruchiresort.link>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New Event Enquiry: ${eventType || 'General'} - ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a; padding: 40px; border-radius: 12px; background-color: #0B0B0D; color: #F4F1EC;">
          <h1 style="color: #B88A64; font-family: 'Cormorant Garamond', serif; font-size: 28px; margin-bottom: 20px; border-bottom: 1px solid rgba(184, 138, 100, 0.2); padding-bottom: 15px;">New Event Enquiry</h1>
          
          <p style="font-size: 16px; color: #B8B2AA; margin-bottom: 30px;">You have received a new enquiry from the Ruchi Resort website.</p>
          
          <div style="margin-bottom: 25px;">
            <p style="margin: 5px 0;"><strong style="color: #B88A64;">Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #B88A64;">Email:</strong> ${email}</p>
            <p style="margin: 5px 0;"><strong style="color: #B88A64;">Phone:</strong> ${phone}</p>
            <p style="margin: 5px 0;"><strong style="color: #B88A64;">Event Type:</strong> ${eventType || 'Not specified'}</p>
            <p style="margin: 5px 0;"><strong style="color: #B88A64;">Event Date:</strong> ${eventDate || 'Not specified'}</p>
          </div>
          
          <div style="padding: 20px; background: rgba(184, 138, 100, 0.05); border-left: 3px solid #B88A64; border-radius: 4px;">
            <strong style="color: #B88A64; display: block; margin-bottom: 10px;">Message:</strong>
            <p style="margin: 0; line-height: 1.6;">${message || 'No additional details provided.'}</p>
          </div>
          
          <p style="margin-top: 40px; font-size: 12px; color: #555; text-align: center;">
            This email was sent from the contact form on ruchiresort.link
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({
        error: 'Communication Error',
        message: 'We encountered an issue sending the enquiry email. Please try again later.'
      });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err: any) {
    console.error('CRASH in handler:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
