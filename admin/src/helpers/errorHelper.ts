import { toastHelper } from './toastHelper';
import type { ServerResponse } from '@/types/api';

export const errorHelper = {
  handleApiError: (error: any, fallbackMessage: string = 'A apărut o eroare') => {
    console.error('API Error:', error);
    
    // Handle server response errors (400, 404, 500, etc.)
    if (error?.response?.data) {
      const serverResponse = error.response.data as ServerResponse;
      toastHelper.add(serverResponse.message, serverResponse.status);
      return;
    } 
    
    // Handle network or other errors
    toastHelper.error(error?.message ?? fallbackMessage);
    throw error;
  }
};