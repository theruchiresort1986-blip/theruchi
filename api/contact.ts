import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, eventType, eventDate, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Ruchi Resorts <notifications@ruchiresort.link>',
            to: ['theruchiresort1986@gmail.com'],
            subject: `New Event Enquiry: ${eventType} - ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c5a059; padding-bottom: 10px;">New Website Enquiry</h2>
          <p style="font-size: 16px;">You have received a new event enquiry from your website.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Event Type:</td>
              <td style="padding: 10px 0;">${eventType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold;">Event Date:</td>
              <td style="padding: 10px 0;">${eventDate || 'Not specified'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
            <p style="line-height: 1.6;">${message || 'No message provided.'}</p>
          </div>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            This email was sent from the Ruchi Resorts website contact form.
          </p>
        </div>
      `,
        });

        if (error) {
            return res.status(400).json({ error });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message });
    }
}
