import { toastHelper } from "@/helpers";
import { useEmailStore } from "@/stores/emailStore";
import { StatusTypes } from "@/types/api";
import axios from "axios";

interface ConnectionTestResult {
    status: number;
    message: string;
    details?: any;
    emailCount?: number;
}

interface EmailConnectionTests {
    imap: ConnectionTestResult;
    smtp: ConnectionTestResult;
}

export const serverService = {
    testConnectionImap: async (): Promise<ConnectionTestResult> => {
        try {
            const response = await axios.get('/server/connection-test/imap');

            if (response.data.status === StatusTypes.Success) {
                // Extract email count from the message - format: "...Au fost gasite X email-uri."
                const message = response.data.message || '';
                const emailCountMatch = message.match(/(\d+)\s+email-uri/);
                const emailCount = emailCountMatch ? parseInt(emailCountMatch[1]) : 0;

                return {
                    status: StatusTypes.Success,
                    message: 'Conexiune IMAP reușită',
                    details: response.data.data,
                    emailCount
                };
            } else {
                return {
                    status: StatusTypes.Error,
                    message: response.data.message || 'Eroare la testarea conexiunii IMAP'
                };
            }
        } catch (error: any) {
            console.error('Test IMAP connection error:', error);
            return {
                status: StatusTypes.Error,
                message: error.response?.data?.message || error.message || 'Eroare la testarea conexiunii IMAP'
            };
        }
    },

    testConnectionSmtp: async (): Promise<ConnectionTestResult> => {
        try {
            const response = await axios.get('/server/connection-test/smtp');

            if (response.data.status === StatusTypes.Success) {
                return {
                    status: StatusTypes.Success,
                    message: 'Conexiune SMTP reușită',
                    details: response.data.data
                };
            } else {
                return {
                    status: StatusTypes.Error,
                    message: response.data.message || 'Eroare la testarea conexiunii SMTP'
                };
            }
        } catch (error: any) {
            console.error('Test SMTP connection error:', error);
            return {
                status: StatusTypes.Error,
                message: error.response?.data?.message || error.message || 'Eroare la testarea conexiunii SMTP'
            };
        }
    },

    testAllConnections: async (): Promise<EmailConnectionTests> => {
        const [imapResult, smtpResult] = await Promise.allSettled([
            serverService.testConnectionImap(),
            serverService.testConnectionSmtp()
        ]);

        return {
            imap: imapResult.status === 'fulfilled' ? imapResult.value : {
                status: StatusTypes.Error,
                message: 'Eroare la testarea conexiunii IMAP'
            },
            smtp: smtpResult.status === 'fulfilled' ? smtpResult.value : {
                status: StatusTypes.Error,
                message: 'Eroare la testarea conexiunii SMTP'
            }
        };
    },

    fetchEmailsFromServer: async () => {
        try {
            const response = await axios.get('/server/emails');
            return response.data;
        } catch (error) {
            console.error('Error updating read status:', error);
            toastHelper.error('Eroare la actualizarea email-urilor');
            throw error;
        }
    },

    sendEmail: async (emailData: {
        to: string,
        subject: string,
        content: string,
        inReplyTo?: string
    }) => {
        const emailStore = useEmailStore();

        try {
            const response = await axios.post(`/server/reply`, emailData);

            if (response.data.success) {
                toastHelper.success('Email trimis cu succes!');
                emailStore.triggerUpdate(); // Trigger update automatically
                return true;
            } else {
                throw new Error(response.data.message || 'Eroare la trimiterea email-ului');
            }
        } catch (error) {
            console.error('Eroare la trimiterea email-ului:', error);
            toastHelper.error('Eroare la trimiterea email-ului. Te rog să încerci din nou.');
            throw error;
        }
    },
}