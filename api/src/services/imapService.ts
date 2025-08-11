import Imap from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';
import { InboxEmail, InboxType, InboxCategory } from '../models';

interface ImapConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

class ImapService {
  private config: ImapConfig;
  private imap: Imap;

  constructor() {
    this.config = {
      host: process.env.IMAP_HOST || 'localhost',
      port: parseInt(process.env.IMAP_PORT || '993'),
      secure: process.env.IMAP_SECURE === 'true',
      user: process.env.IMAP_USER || '',
      password: process.env.IMAP_PASSWORD || ''
    };

    this.imap = new Imap({
      host: this.config.host,
      port: this.config.port,
      tls: this.config.secure,
      user: this.config.user,
      password: this.config.password,
      tlsOptions: { rejectUnauthorized: false }
    });
  }

  private connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.imap.once('ready', () => {
        console.log('✅ IMAP connection established');
        resolve();
      });

      this.imap.once('error', (err: Error) => {
        console.error('❌ IMAP connection error:', err);
        reject(err);
      });

      this.imap.connect();
    });
  }

  private disconnect(): void {
    this.imap.end();
  }

  private openBox(boxName: string = 'INBOX'): Promise<Imap.Box> {
    return new Promise((resolve, reject) => {
      this.imap.openBox(boxName, true, (err, box) => {
        if (err) {
          reject(err);
        } else {
          resolve(box);
        }
      });
    });
  }

  private fetchEmail(msgId: number): Promise<ParsedMail> {
    return new Promise((resolve, reject) => {
      const fetch = this.imap.fetch([msgId], {
        bodies: '',
        struct: true,
        envelope: true
      });
      
      let envelopeData: any = null;

      fetch.on('message', (msg) => {
        let body = '';
        
        msg.on('attributes', (attrs: any) => {
          envelopeData = attrs.envelope;
          console.log('📧 IMAP Envelope data:', envelopeData);
        });

        msg.on('body', (stream) => {
          stream.on('data', (chunk) => {
            body += chunk.toString('utf8');
          });
        });

        msg.once('end', async () => {
          try {
            const parsed = await simpleParser(body);
            // Add envelope data to parsed object
            if (envelopeData) {
              (parsed as any).envelope = envelopeData;
            }
            resolve(parsed);
          } catch (error) {
            reject(error);
          }
        });
      });

      fetch.once('error', reject);
      fetch.once('end', () => {
        console.log('Email fetch completed');
      });
    });
  }

  private async saveEmailToDatabase(parsedEmail: ParsedMail, category: 'EMAILS_RECEIVED' | 'EMAILS_SENT'): Promise<InboxEmail | null> {
    try {
      // Get inbox type (default to INTERNAL_INBOX)
      const inboxType = await InboxType.findOne({ where: { type: 'INTERNAL_INBOX' } });
      if (!inboxType) {
        console.error('❌ Inbox type not found');
        return null;
      }

      // Get inbox category
      const inboxCategory = await InboxCategory.findOne({ where: { category } });
      if (!inboxCategory) {
        console.error('❌ Inbox category not found');
        return null;
      }

      // Extract email addresses and names with better parsing
      console.log('🔍 Full parsed email object keys:', Object.keys(parsedEmail));
      console.log('📧 Parsing email from:', JSON.stringify(parsedEmail.from, null, 2));
      console.log('📧 Parsing email to:', JSON.stringify(parsedEmail.to, null, 2));
      console.log('📧 Envelope data:', (parsedEmail as any).envelope);
      
      // Try to get from and to from different sources
      let fromRaw: any = parsedEmail.from;
      let toRaw: any = parsedEmail.to;
      
      // If envelope data is available, use it (IMAP envelope is more reliable)
      const envelope = (parsedEmail as any).envelope;
      if (envelope) {
        if (envelope.from && envelope.from.length > 0) {
          const envFrom = envelope.from[0];
          fromRaw = `${envFrom.name || ''} <${envFrom.mailbox}@${envFrom.host}>`;
          console.log('📧 Using envelope from:', fromRaw);
        }
        
        if (envelope.to && envelope.to.length > 0) {
          const envTo = envelope.to[0];
          toRaw = `${envTo.name || ''} <${envTo.mailbox}@${envTo.host}>`;
          console.log('📧 Using envelope to:', toRaw);
        }
      }
      
      // If still empty, try headerLines as fallback
      if (!fromRaw || (Array.isArray(fromRaw) && fromRaw.length === 0) || (typeof fromRaw === 'object' && Object.keys(fromRaw).length === 0)) {
        const fromHeader = parsedEmail.headerLines?.find(h => h.key.toLowerCase() === 'from');
        if (fromHeader && fromHeader.line) {
          console.log('📧 Using from header line:', fromHeader.line);
          fromRaw = fromHeader.line.replace(/^[^:]+:\s*/, ''); // Remove "From: " prefix
        }
      }
      
      if (!toRaw || (Array.isArray(toRaw) && toRaw.length === 0) || (typeof toRaw === 'object' && Object.keys(toRaw).length === 0)) {
        const toHeader = parsedEmail.headerLines?.find(h => h.key.toLowerCase() === 'to');
        if (toHeader && toHeader.line) {
          console.log('📧 Using to header line:', toHeader.line);
          toRaw = toHeader.line.replace(/^[^:]+:\s*/, ''); // Remove "To: " prefix
        }
      }
      
      console.log('📧 Final fromRaw:', fromRaw);
      console.log('📧 Final toRaw:', toRaw);
      
      // Extract name and email with fallbacks
      const extractNameAndEmail = (addressObj: any) => {
        if (!addressObj) return { name: 'Unknown', address: '' };
        
        let name = 'Unknown';
        let address = '';
        
        if (addressObj.name && addressObj.address) {
          name = addressObj.name;
          address = addressObj.address;
        } else if (addressObj.address) {
          address = addressObj.address;
          name = addressObj.address.split('@')[0]; // Use part before @ as fallback name
        } else if (typeof addressObj === 'string') {
          // Handle string format like "Name <email@domain.com>"
          const match = addressObj.match(/^(.+?)\s*<(.+)>$/);
          if (match) {
            name = match[1].trim();
            address = match[2].trim();
          } else {
            address = addressObj;
            name = addressObj.split('@')[0];
          }
        }
        
        return { name, address };
      };
      
      // Parse the final raw values
      const fromParsed = extractNameAndEmail(fromRaw);
      const toParsed = extractNameAndEmail(toRaw);
      
      if (!fromParsed.address) {
        console.error('❌ Missing from address after parsing');
        return null;
      }
      
      
      console.log('✅ Parsed from:', fromParsed);
      console.log('✅ Parsed to:', toParsed);

      // Check if email already exists using Message-ID (more reliable)
      let messageId = parsedEmail.messageId;
      
      // If no messageId from parser, try to get it from envelope or headers
      if (!messageId && envelope && envelope.messageId) {
        messageId = envelope.messageId;
      }
      
      if (!messageId) {
        const messageIdHeader = parsedEmail.headerLines?.find(h => h.key.toLowerCase() === 'message-id');
        if (messageIdHeader && messageIdHeader.line) {
          messageId = messageIdHeader.line.replace(/^[^:]+:\s*/, '').trim();
        }
      }
      
      console.log('📧 Message-ID for duplicate check:', messageId);
      
      if (messageId) {
        const existingEmail = await InboxEmail.findOne({
          where: {
            custom_data: {
              messageId: messageId
            }
          }
        });

        if (existingEmail) {
          console.log('⚠️ Email already exists (Message-ID match), skipping');
          return null;
        }
      } else {
        // Fallback to old method if no Message-ID available
        console.log('⚠️ No Message-ID found, using fallback duplicate check');
        const existingEmail = await InboxEmail.findOne({
          where: {
            email_from: fromParsed.address,
            subject: parsedEmail.subject || '',
            createdAt: parsedEmail.date
          }
        });

        if (existingEmail) {
          console.log('⚠️ Email already exists (fallback match), skipping');
          return null;
        }
      }

      // Create inbox email record
      const inboxEmail = await InboxEmail.create({
        inbox_type_id: inboxType.id,
        inbox_category_id: inboxCategory.id,
        email_from: fromParsed.address,
        email_from_name: fromParsed.name,
        email_to: toParsed.address,
        email_mail_to: toParsed.name,
        subject: parsedEmail.subject || 'No Subject',
        message: parsedEmail.html || parsedEmail.text || '',
        custom_data: {
          messageId: messageId || parsedEmail.messageId,
          date: parsedEmail.date,
          attachments: parsedEmail.attachments?.map(att => ({
            filename: att.filename,
            contentType: att.contentType,
            size: att.size
          })),
          envelope: envelope // Store envelope data for reference
        },
        is_read: false
      });

      console.log(`✅ Email saved: ${parsedEmail.subject}`);
      return inboxEmail;
    } catch (error) {
      console.error('❌ Error saving email to database:', error);
      return null;
    }
  }

  async fetchAllEmails(progressCallback?: (processed: number, total: number) => void): Promise<{ success: boolean; message: string; emailsProcessed: number; totalFound?: number; details?: string }> {
    try {
      console.log('🔄 Starting email fetch process...');
      
      await this.connect();
      const box = await this.openBox('INBOX');
      
      console.log(`📧 Found ${box.messages.total} emails in inbox`);

      if (box.messages.total === 0) {
        this.disconnect();
        return { success: true, message: 'No emails found', emailsProcessed: 0, totalFound: 0 };
      }

      let emailsProcessed = 0;
      let emailsSkipped = 0;
      const totalEmails = box.messages.total;

      // Fetch emails (start from most recent, limit to last 50 to avoid overload)
      const searchCriteria = ['ALL'];
      
      return new Promise((resolve) => {
        this.imap.search(searchCriteria, async (err, results) => {
          if (err) {
            console.error('❌ IMAP search error:', err);
            this.disconnect();
            resolve({ success: false, message: err.message, emailsProcessed: 0, totalFound: 0 });
            return;
          }

          if (!results || results.length === 0) {
            this.disconnect();
            resolve({ success: true, message: 'No emails found', emailsProcessed: 0, totalFound: 0 });
            return;
          }

          // Limit to last 50 emails to avoid overload
          const emailsToFetch = results.slice(-50);
          const totalToProcess = emailsToFetch.length;
          console.log(`🔄 Processing ${totalToProcess} emails...`);

          // Report initial progress
          if (progressCallback) {
            progressCallback(0, totalToProcess);
          }

          const fetch = this.imap.fetch(emailsToFetch, {
            bodies: '',
            struct: true,
            envelope: true
          });

          fetch.on('message', (msg, seqno) => {
            let body = '';
            let envelopeData: any = null;

            msg.on('body', (stream) => {
              stream.on('data', (chunk) => {
                body += chunk.toString('utf8');
              });
            });
            
            msg.on('attributes', (attrs: any) => {
              envelopeData = attrs.envelope;
              console.log(`📧 IMAP Envelope data for email ${seqno}:`, envelopeData);
            });

            msg.once('end', async () => {
              try {
                const parsed = await simpleParser(body);
                // Add envelope data to parsed object
                if (envelopeData) {
                  (parsed as any).envelope = envelopeData;
                }
                const savedEmail = await this.saveEmailToDatabase(parsed, 'EMAILS_RECEIVED');
                if (savedEmail) {
                  emailsProcessed++;
                } else {
                  emailsSkipped++; // Email was duplicate or failed to save
                }
                
                const currentProgress = emailsProcessed + emailsSkipped;
                console.log(`📧 Progress: ${currentProgress}/${totalToProcess} processed (${emailsProcessed} new, ${emailsSkipped} skipped)`);
                
                // Report progress after each email is processed
                if (progressCallback) {
                  progressCallback(currentProgress, totalToProcess);
                }
              } catch (error) {
                console.error(`❌ Error processing email ${seqno}:`, error);
                emailsSkipped++;
                
                const currentProgress = emailsProcessed + emailsSkipped;
                // Report progress even for failed emails
                if (progressCallback) {
                  progressCallback(currentProgress, totalToProcess);
                }
              }
            });
          });

          fetch.once('error', (fetchErr) => {
            console.error('❌ Fetch error:', fetchErr);
            this.disconnect();
            resolve({ success: false, message: fetchErr.message, emailsProcessed });
          });

          fetch.once('end', () => {
            console.log(`✅ Email fetch completed. Processed ${emailsProcessed} emails`);
            this.disconnect();
            resolve({ 
              success: true, 
              message: 'Emails fetched successfully', 
              emailsProcessed, 
              totalFound: totalToProcess,
              details: `${emailsProcessed} new emails, ${emailsSkipped} skipped (duplicates or errors)`
            });
          });
        });
      });

    } catch (error) {
      console.error('❌ Email fetch error:', error);
      this.disconnect();
      return { success: false, message: (error as Error).message, emailsProcessed: 0 };
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.connect();
      const box = await this.openBox('INBOX');
      this.disconnect();
      
      return {
        success: true,
        message: `Connection successful. Found ${box.messages.total} emails in inbox.`
      };
    } catch (error) {
      return {
        success: false,
        message: (error as Error).message
      };
    }
  }
}

export default ImapService;