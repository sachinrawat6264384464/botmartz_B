import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, bootcampName } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Botmartz AI Solutions" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Sorry we missed you at ${bootcampName}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0B1C2C;">
            <h1 style="color: #0066FF;">Hi ${name},</h1>
            <p>We noticed you weren't able to join us for the live session of <strong>${bootcampName}</strong>.</p>
            <p>Because these sessions are highly interactive and hands-on, certificates of completion are only issued to attendees who participated live.</p>
            <p>However, your journey doesn't stop here! We'd love to see you at the next one.</p>
            
            <div style="margin: 30px 0;">
              <a href="https://www.botmartz.com/community/ai-accelerator-workshop/build-smarter-ai-agents" style="background-color: #0066FF; color: white; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Register for Bootcamp 02
              </a>
            </div>

            <p>If you have any questions, feel free to reply directly to this email or reach out in the <a href="https://discord.gg/d7PmsQFx9">Discord Community</a>.</p>
            <br/>
            <p>Best regards,</p>
            <p><strong>The Botmartz Team</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "Follow-up email sent successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Send Followup Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
