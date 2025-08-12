export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface PaginationQuery {
  page?: string | number;
  limit?: string | number;
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
}

export interface InboxEmailQuery extends SearchQuery {
  category?: string;
  label?: string;
}

export interface WhereClause {
  [key: string]: any;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmailsWithPagination {
  emails: any[];
  pagination: PaginationData;
}

export interface FormCustomData {
  type?: string;
  phone?: string;
  formData?: {
    phone?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface JWTPayload {
  id: number;
  userId?: number;
  email: string;
  iat?: number;
  exp?: number;
}

export interface LabelData {
  label: string;
  color?: string;
  icon?: string;
}

export interface UpdateEmailData {
  is_read?: boolean;
  inbox_label_id?: string | null;
}