import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendAssessmentLink(to: string, name: string, link: string, expiresAt: Date) {
    const mailOptions = {
      from: `"Recruitment Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your Assessment Link',
      html: `
        <p>Hi ${name},</p>
        <p>Please click the link below to take your assessment. The link is valid until <strong>${expiresAt.toLocaleString()}</strong>.</p>
        <a href="${link}">${link}</a>
        <p>All the best!</p>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
