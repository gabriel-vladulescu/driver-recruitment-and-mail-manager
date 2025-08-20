import axios from 'axios'
import { toastHelper, errorHelper } from '@/helpers';
import { useEmailStore } from '@/stores/emailStore';
import type { LabelFormData } from '@/types';

export const labelService = {
    getLabels: async () => {
        try {
            const response = await axios.get('/inbox/labels');
            return response.data.data;
        } catch (error) {
            errorHelper.handleApiError(error, 'Eroare la obținerea etichetelor');
        }
    },

    addLabel: async (labelData: LabelFormData) => {
        const emailStore = useEmailStore();
        try {
            const response = await axios.post(`/inbox/labels`, labelData);
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
        } catch (error) {
            errorHelper.handleApiError(error, 'Eroare la crearea etichetei');
        }
    },

    editLabel: async (labelId: string | number, labelData: LabelFormData) => {
        const emailStore = useEmailStore();
        try {
            const response = await axios.patch(`/inbox/labels/${labelId}`, labelData);
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
        } catch (error) {
            errorHelper.handleApiError(error, 'Eroare la editarea etichetei');
        }
    },
    deleteLabel: async (labelId: string | number) => {
        const emailStore = useEmailStore();
        try {
            const response = await axios.delete(`/inbox/labels/${labelId}`);
            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
        } catch (error) {
            errorHelper.handleApiError(error, 'Eroare la ștergerea etichetei');
        }
    },

    moveToLabel: async (ids: number[], labelId: number | null): Promise<void> => {
        const emailStore = useEmailStore();
        try {
            const response = await axios.post(
                `/inbox/emails/label/${labelId}`,
                {
                    ids
                }
            );

            toastHelper.add(response.data.message, response.data.status);
            emailStore.triggerUpdate();
            emailStore.triggerBackToList();
            return;
        } catch (error: any) {
            errorHelper.handleApiError(error, 'Eroare la aplicarea etichetei');
        }
    },
} 