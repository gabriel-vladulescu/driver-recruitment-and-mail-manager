export interface User {
  id: number;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface FormSubmission {
  id: number;
  type: 'TYPE_CONTACT' | 'TYPE_RECRUITMENT' | 'TYPE_EXTERNAL_CAR_RENT';
  subject: string;
  preview_message: string;
  is_read: boolean;
  is_archived: boolean;
  contact_email?: string;
  contact_phone?: string;
  form_data: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface JWTPayload {
  id: number;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface FormType {
  icon: string;
  label: string;
}

export const FORM_TYPES: Record<string, FormType> = {
  'TYPE_CONTACT': { icon: 'MessageCircle', label: 'Contact' },
  'TYPE_RECRUITMENT': { icon: 'Briefcase', label: 'Recrutare' },
  'TYPE_EXTERNAL_CAR_RENT': { icon: 'Car', label: 'Închiriere' }
};