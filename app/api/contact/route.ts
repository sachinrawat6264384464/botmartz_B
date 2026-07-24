import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase'; // Adjust path to your Firebase config
import { adminDb } from '@/lib/firebase-admin';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, firstName, lastName, email, company, message } = body;

    // Determine final name
    const finalName = name || `${firstName || ''} ${lastName || ''}`.trim();

    // Validation
    if (!finalName || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    if (finalName.length < 2 || finalName.length > 150) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 150 characters' },
        { status: 400 }
      );
    }

    if (message.length < 5 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 5 and 2000 characters' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'contacts'), {
      name: finalName,
      email: email.toLowerCase().trim(),
      company: (company || '').trim(),
      message: message.trim(),
      createdAt: serverTimestamp(),
      status: 'unread'
    });

    // ── Email Notification Logic (SMTP / Hostinger / Gmail) ──
    let settings: any = {};
    try {
      const settingsSnap = await adminDb.collection("settings").doc("global").get();
      if (settingsSnap.exists) {
        settings = settingsSnap.data();
      }
    } catch (e) {
      console.warn("Could not fetch global settings for contact form", e);
    }

    const smtpHost = settings?.email?.smtpHost || process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = settings?.email?.smtpPort || parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpUser = settings?.email?.smtpUser || process.env.SMTP_USER || process.env.GMAIL_USER;
    const smtpPass = settings?.email?.smtpPass || process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;
    const adminEmail = settings?.email?.supportEmail || process.env.ADMIN_EMAIL || 'soham@botmartz.com';
    const companyName = settings?.general?.companyName || 'Botmartz';
    const fromName = settings?.email?.fromName || 'Botmartz Notifications';

    if (smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465, // True for 465, false for other ports
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        // Beautiful HTML Template matching Botmartz theme
        const mailOptions = {
          from: `"${fromName}" <${smtpUser}>`,
          to: adminEmail,
          subject: `✨ New Inquiry from ${finalName} (${company || 'No Company'})`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>New Botmartz Inquiry</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  background-color: #f7f8fa;
                  color: #0d1117;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  background: #ffffff;
                  border: 1px solid #e1e4e6;
                  border-radius: 12px;
                  overflow: hidden;
                  margin: 0 auto;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                }
                .header {
                  background-color: #040C18;
                  padding: 30px;
                  text-align: center;
                  border-bottom: 3px solid #00B8F0;
                }
                .header h1 {
                  color: #ffffff;
                  font-size: 22px;
                  margin: 0;
                  letter-spacing: 1px;
                }
                .header p {
                  color: #00B8F0;
                  font-family: monospace;
                  font-size: 11px;
                  margin: 5px 0 0 0;
                  text-transform: uppercase;
                  font-weight: bold;
                }
                .content {
                  padding: 30px;
                }
                .detail-row {
                  margin-bottom: 20px;
                  border-bottom: 1px solid #f0f1f2;
                  padding-bottom: 12px;
                }
                .detail-row:last-child {
                  border-bottom: none;
                }
                .label {
                  font-size: 11px;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  color: #8b949e;
                  font-weight: bold;
                  margin-bottom: 4px;
                }
                .value {
                  font-size: 15px;
                  color: #0d1117;
                  line-height: 1.5;
                }
                .message-box {
                  background-color: #f6f8fa;
                  border-left: 4px solid #00B8F0;
                  padding: 15px;
                  border-radius: 4px;
                  font-size: 14px;
                  color: #24292f;
                  line-height: 1.6;
                  white-space: pre-wrap;
                }
                .footer {
                  background-color: #f6f8fa;
                  padding: 20px;
                  text-align: center;
                  border-top: 1px solid #e1e4e6;
                }
                .btn {
                  display: inline-block;
                  background-color: #00B8F0;
                  color: #ffffff !important;
                  text-decoration: none;
                  padding: 12px 24px;
                  border-radius: 6px;
                  font-weight: bold;
                  font-size: 13px;
                  margin-top: 10px;
                  box-shadow: 0 2px 4px rgba(0, 184, 240, 0.2);
                }
                .btn:hover {
                  background-color: #009ecc;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>${companyName.toUpperCase()}</h1>
                  <p>Inquiry Received</p>
                </div>
                <div class="content">
                  <div class="detail-row">
                    <div class="label">Full Name</div>
                    <div class="value"><strong>${finalName}</strong></div>
                  </div>
                  <div class="detail-row">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="detail-row">
                    <div class="label">Company Name</div>
                    <div class="value">${company || 'Not Specified'}</div>
                  </div>
                  <div class="detail-row">
                    <div class="label">Message / Requirement</div>
                    <div class="message-box">${message}</div>
                  </div>
                </div>
                <div class="footer">
                  <p style="font-size: 12px; color: #57606a; margin: 0 0 10px 0;">This inquiry has been logged in the ${companyName} CRM database.</p>
                  <a href="${request.headers.get('origin') || 'https://botmartz.com'}/admin/contacts" class="btn">View CRM Contacts</a>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Lead email notification sent successfully to', adminEmail);
      } catch (mailError) {
        console.error('⚠️ Nodemailer failed to send email:', mailError);
        // We log it but do not crash the response so the lead is not lost
      }
    } else {
      console.warn('⚠️ SMTP mail credentials not found in env. Skipping email notification.');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: docRef.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}