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

    // Validate required fields
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    // Verify transporter configuration
    await transporter.verify();

    // Build user email HTML
    let userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0891b2;">Hello ${name},</h1>
        
        <p>Thank you for completing our Money Personality Assessment. Here are your results:</p>
        
        <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-radius: 8px;">
          <h2 style="color: #0891b2; margin-top: 0;">Your Money Personality: ${personalityType}</h2>
    `;

    // Add Description if available
    if (description) {
      userEmailHtml += `<p><strong>Description:</strong> ${description}</p>`;
    }

    // Add Key Traits if available
    if (traits && traits.length > 0) {
      userEmailHtml += `
        <h3 style="color: #0891b2;">Key Traits:</h3>
        <ul>
          ${traits.map(trait => `<li>${trait}</li>`).join('')}
        </ul>
      `;
    }

    // Add Recommended Products if available
    if (recommendations && recommendations.length > 0) {
      userEmailHtml += `
        <h3 style="color: #0891b2;">Recommended Products:</h3>
        <ul>
          ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      `;
    }

    userEmailHtml += `
        </div>

        <div style="margin: 30px 0;">
          <p><strong>What's Next?</strong></p>
          <p>Book a free consultation to discuss your investment strategy!</p>
          <p>Reply to this email or call us to schedule your session.</p>
        </div>

        <hr style="border: 1px solid #eee; margin: 30px 0;" />
        
        <p style="color: #666; font-size: 14px;">Best regards,<br>QuantQuest</p>
      </div>
    `;

    // Send email to user
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Your Money Personality Results',
      html: userEmailHtml,
    });

    // Build admin email HTML
    let adminEmailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Lead from Money Personality Tool</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Money Personality:</strong> ${personalityType}</p>
    `;

    // Add Description if available
    if (description) {
      adminEmailHtml += `<p><strong>Description:</strong> ${description}</p>`;
    }

    // Add Key Traits if available
    if (traits && traits.length > 0) {
      adminEmailHtml += `<p><strong>Key Traits:</strong> ${traits.join(', ')}</p>`;
    }

    // Add Recommended Products if available
    if (recommendations && recommendations.length > 0) {
      adminEmailHtml += `<p><strong>Recommended Products:</strong> ${recommendations.join(', ')}</p>`;
    }

    adminEmailHtml += `<p><strong>Date:</strong> ${new Date().toLocaleString()}</p></div>`;

    // Send notification to admin
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
    } else {
      console.error('Error sending email:', error);
    }

    return NextResponse.json(
      { message: 'Error sending email', error: errorMessage },
      { status: 500 }
    );
  }
}
