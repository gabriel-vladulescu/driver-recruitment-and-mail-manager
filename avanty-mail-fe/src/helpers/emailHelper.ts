import DOMPurify from 'dompurify'

export const emailHelper = {
    getEmailFromFormat: (email: any) => {
        if (!email) return 'Necunoscut'

        if (email.email_from_name.length > 0 && email.email_from.length > 0) {
            return email.email_from_name + ' <' + email.email_from + '>';
        }

        if (email.email_from.length > 0) {
            return email.email_from;
        }

        return 'Necunoscut';
    },

    getEmailToFormat: (email: any) => {
        if (!email) return 'Necunoscut'

        if (email.email_to_name.length > 0 && email.email_to.length > 0) {
            return email.email_to_name + ' <' + email.email_to + '>';
        }

        if (email.email_to.length > 0) {
            return email.email_to;
        }

        return 'Necunoscut';
    },

    getInitials: (name: string) => {
        if (!name) return '?'
        const names = name.split(' ')
        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase()
        }
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase()
    },

    formatFileSize: (bytes: number) => {
        if (bytes === 0) return '0 Bytes'

        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    sanitizeHtml: (html: string) => {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'b', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'img', 'div', 'span', 'table', 'tr', 'td', 'th', 'thead', 'tbody'],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'style', 'class'],
            ALLOW_DATA_ATTR: false
        })
    },

    getEmailPreview: (htmlContent: string) => {
        const text = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
        return text.length > 100 ? text.substring(0, 100) + '...' : text
    }
}