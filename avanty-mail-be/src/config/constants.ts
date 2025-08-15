export const INBOX_TYPES = {
    INTERNAL: 1,
    EXTERNAL_FORMS: 2,
} as const;

export const INBOX_CATEGORIES = {
    FORMS: 1,
    EMAILS_SENT: 2,
} as const;

export const FORM_TYPES = {
    CONTACT: 'TYPE_CONTACT',
    RECRUITMENT: 'TYPE_RECRUITMENT',
    EXTERNAL_CAR_RENT: 'TYPE_EXTERNAL_CAR_RENT',
} as const;

export const DEFAULT_EMAIL_TO = process.env.SMTP_USER || 'admin@example.com';