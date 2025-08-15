import nodemailer from 'nodemailer';

interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

class SmtpService {
  private smtpTransporter: nodemailer.Transporter;

  constructor() {
    const emailConfig: EmailConfig = {
      smtp: {
        host: process.env.SMTP_HOST || '',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASSWORD || '',
        },
      },
    };

    this.smtpTransporter = nodemailer.createTransport(emailConfig.smtp);
  }

  async sendReply(options: {
    to: string;
    subject: string;
    content: string;
    inReplyTo?: string;
  }): Promise<void> {
    try {
      const { to, subject, content, inReplyTo } = options;
      
      // Convert HTML content to plain text for the text version
      const textContent = this.stripHtml(content);
      
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="line-height: 1.6; margin-bottom: 30px;">
            ${content}
          </div>
          ${true ? `
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
              <div style="white-space: pre-wrap; color: #666; font-size: 14px;">
                Signature: <strong>Bloom Driver Support</strong><br>
              </div>
            </div>
          ` : ''}
          <div style="margin-top: 30px; padding: 15px; background: #f8f9fa; border-radius: 8px; font-size: 12px; color: #666;">
            <p style="margin: 0;">Acest email a fost trimis din panoul de administrare Bloom Driver.</p>
            <p style="margin: 5px 0 0 0;">Pentru suport tehnic, contactați echipa de dezvoltare.</p>
          </div>
        </div>
      `;

      const signature = '<h2>Bloom Driver Support</h2>'; // Example signature, can be dynamic

      const mailOptions = {
        from: `"Bloom Driver Support" <${process.env.SMTP_USER}>`,
        to: to,
        subject: subject,
        html: htmlContent,
        text: textContent + (signature ? '\n\n' + signature : ''),
      };

      const result = await this.smtpTransporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Nu s-a putut trimite email-ul. Verificați configurarea SMTP.');
    }
  }

  async testConnection(): Promise<{ success: boolean }> {
    const results = { success: false };

    try {
      await this.smtpTransporter.verify();
      results.success = true;
    } catch (error) {
      results.success = false;
    }

    return results;
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }
}

export default new SmtpService();