import axios from 'axios';
import { errorHelper, toastHelper } from '@/helpers';
import { useEmailStore } from '@/stores/emailStore';

export const emailService = {
    markAsRead: async (emailIds: number | number[], isRead: boolean): Promise<void> => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];
        
        try {
            const response = await axios.post('/api/inbox/emails/read', { 
                ids, 
                is_read: isRead 
            });
            
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
            return;
        } catch (error: any) {
            errorHelper.handleApiError(error, 'Eroare la actualizarea stării de citire');
            throw error;
        }
    },

    moveToTrash: async (emailIds: number | number[], fromArchive?: boolean) => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];

        try {
            const payload: { ids: number[], from_archive?: boolean } = { ids };
            if (fromArchive) {
                payload.from_archive = true;
            }
            
            await axios.post('/api/inbox/trash', payload);
            const count = ids.length;
            toastHelper.success(`${count} email${count > 1 ? '-uri au fost mutate' : ' a fost mutat'} în coșul de gunoi`);
            emailStore.triggerUpdate();
            if (!Array.isArray(emailIds)) {
                emailStore.triggerBackToList();
            }
        } catch (error) {
            console.error('Error moving emails to trash:', error);
            toastHelper.error('Eroare la mutarea email-urilor în coș');
            throw error;
        }
    },

    moveToArchive: async (emailIds: number | number[]) => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];

        try {
            await axios.post('/api/inbox/archive', { ids });
            const count = ids.length;
            toastHelper.success(`${count} email${count > 1 ? '-uri au fost arhivate' : ' a fost arhivat'}`);
            emailStore.triggerUpdate();
            if (!Array.isArray(emailIds)) {
                emailStore.triggerBackToList();
            }
        } catch (error) {
            console.error('Error archiving emails:', error);
            toastHelper.error('Eroare la arhivarea email-urilor');
            throw error;
        }
    },

    cleanTrash: async (emailIds: number | number[]): Promise<void> => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];
        
        try {
            const response = await axios.post('/api/inbox/trash/clean', { ids });
            
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
            emailStore.triggerBackToList();
            return;
        } catch (error: any) {
            errorHelper.handleApiError(error, 'Eroare la ștergerea definitivă a email-urilor');
            throw error;
        }
    },

    restoreFromTrash: async (emailIds: number | number[]): Promise<void> => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];

        try {
            const response = await axios.post('/api/inbox/trash/restore', { ids });
            
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
            emailStore.triggerBackToList();
            return;
        } catch (error: any) {
            errorHelper.handleApiError(error, 'Eroare la restaurarea email-urilor');
            throw error;
        }
    },

    restoreFromArchive: async (emailIds: number | number[]): Promise<void> => {
        const emailStore = useEmailStore();
        const ids = Array.isArray(emailIds) ? emailIds : [emailIds];

        try {
            const response = await axios.post('/api/inbox/archive/restore', { ids });
            
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
            emailStore.triggerBackToList();
            return;
        } catch (error: any) {
            errorHelper.handleApiError(error, 'Eroare la restaurarea email-urilor din arhivă');
            throw error;
        }
    },

    getEmails: async (params: {
        view?: any,
        page?: number,
        search?: string
    }) => {
        const pageSize = 10;
        let url;

        if (params.view?.type === 'trash') {
            url = `/api/inbox/trash?page=${params.page || 1}&limit=${pageSize}`;
        } else if (params.view?.type === 'archive') {
            url = `/api/inbox/archive?page=${params.page || 1}&limit=${pageSize}`;
        } else {
            url = `/api/inbox/emails?page=${params.page || 1}&limit=${pageSize}`;

            if (params.view?.type === 'category' && params.view?.id) {
                url += `&inbox_category_id=${params.view.id}`;
            } else if (params.view?.type === 'label' && params.view?.id) {
                url += `&label=${params.view.id}`;
            }
        }

        if (params.search) {
            url += `&search=${encodeURIComponent(params.search)}`;
        }
        try {
            const response = await axios.get(url);
            return response.data.data;
        } catch (error) {
            toastHelper.error('Eroare la încărcarea email-urilor');
            console.error('Error updating read status:', error);
            throw error;
        }
    },
}