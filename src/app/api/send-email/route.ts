// src/app/api/send-email/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  personalityType: string;
  description?: string;
  traits?: string[];
  recommendations?: string[];
}

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      personalityType,
      description,
      traits,
      recommendations,
    }: EmailData = await request.json();

    if (!name || !email || !personalityType) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!emailUser || !emailPassword || !adminEmail) {
      console.error('EMAIL_USER, EMAIL_PASSWORD, or ADMIN_EMAIL is not defined');
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    await transporter.verify();

    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
        <header style="text-align: center; margin-bottom: 30px; background-color: #000000; padding: 20px; border-radius: 8px;">
          <img src="https://quantquest.vercel.app/images/quantquestlogo.png" alt="QuantQuest Logo" style="max-width: 200px;" />
        </header>

        <h1 style="color: #000000;">Hello ${name},</h1>
        
        <p>Congratulations on taking a significant step toward financial empowerment by completing our <strong>Money Personality Assessment</strong>! Your results reveal that you are <strong>"${personalityType}"</strong>.</p>
        
        <p>At <strong>QuantQuest</strong>, our mission is to empower individuals and financial advisors with innovative tools that elevate financial decision-making.</p>
        
        <div style="background: #f1f5f9; padding: 25px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #000000;">
          <h2 style="color: #000000; margin-top: 0;">Your Money Personality: ${personalityType}</h2>
          
          ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
          
          ${traits && traits.length > 0 ? `
            <h3 style="color: #000000;">Key Traits:</h3>
            <ul style="color: #1e293b;">
              ${traits.map(trait => `<li>${trait}</li>`).join('')}
            </ul>
          ` : ''}
          
          ${recommendations && recommendations.length > 0 ? `
            <h3 style="color: #000000;">Recommended Products:</h3>
            <ul style="color: #1e293b;">
              ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
          ` : ''}
        </div>
        
        <h3 style="color: #000000;">Addressing Your Financial Needs:</h3>
        <ul style="color: #1e293b;">
          <li><strong>Financial Clarity:</strong> We demystify finances with user-friendly tools</li>
          <li><strong>Personalized Guidance:</strong> Our strategies are tailored to your specific needs</li>
          <li><strong>Trusted Partnership:</strong> We build trust through open communication</li>
        </ul>
        
        <div style="background: #000000; color: #ffffff; padding: 25px; border-radius: 8px; margin: 30px 0;">
          <h3 style="color: #ffffff; margin-top: 0;">What's Next?</h3>
          <p>We'll reach out shortly to schedule your personalized consultation. This conversation will help align our strategies with your financial goals.</p>
        </div>
        
        <hr style="border: 1px solid #e2e8f0; margin: 30px 0;" />
        
        <footer style="text-align: center; color: #475569;">
          <p style="font-size: 16px;">Best regards,<br>QuantQuest Team</p>
          <p>
            Ben Zhang<br>
            Senior Financial Advisor<br>
            <a href="https://quantquest.vercel.app/" style="color: #000000; text-decoration: none;">https://quantquest.sg/</a><br>
            <a href="tel:+65 92218314" style="color: #000000; text-decoration: none;">+65 9221 8314</a>
          </p>
          <p>
            <a href="https://quantquest.vercel.app/privacy-policy" style="color: #000000; text-decoration: none;">Privacy Policy</a>
          </p>
          
          <div style="font-size: 12px; color: #64748b; margin-top: 20px;">
            <p>Your privacy is our utmost priority. All information is kept strictly confidential in accordance with PDPA.</p>
          </div>
        </footer>
      </div>
    `;

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Unlock Your Financial Potential with QuantQuest',
      html: userEmailHtml,
    });

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Lead from Money Personality Tool</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Money Personality:</strong> ${personalityType}</p>
        ${description ? `<p><strong>Description:</strong> ${description}</p>` : ''}
        ${traits && traits.length > 0 ? `<p><strong>Key Traits:</strong> ${traits.join(', ')}</p>` : ''}
        ${recommendations && recommendations.length > 0 ? `<p><strong>Recommended Products:</strong> ${recommendations.join(', ')}</p>` : ''}
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;

    await transporter.sendMail({
      from: emailUser,
      to: adminEmail,
      subject: 'New Money Personality Lead',
      html: adminEmailHtml,
    });

    return NextResponse.json({ message: 'Emails sent successfully' }, { status: 200 });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error sending email:', error.message);
    }
    return NextResponse.json(
      { message: 'Error sending email', error: errorMessage },
      { status: 500 }
    );
  }
}