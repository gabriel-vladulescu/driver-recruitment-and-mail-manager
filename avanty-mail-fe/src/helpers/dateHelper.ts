export const dateHelper = {

    formatDate(dateString: string): string {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date format: ' + dateString);
        }

        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (days === 0) {
            return `Astăzi la ${date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`
        } else if (days === 1) {
            return `Ieri la ${date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}`
        } else if (days < 7) {
            return `${days} zile în urmă`
        } else {
            return date.toLocaleDateString('ro-RO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }
    },

    formatTimeAgo(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minutes ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hours ago`;
        const days = Math.floor(hours / 24);
        return `${days} days ago`;
    }
}