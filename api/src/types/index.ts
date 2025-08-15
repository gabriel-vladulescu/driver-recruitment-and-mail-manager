export interface ServerResponse {
  status: ResponseStatus;
  message?: string;
  data?: object;
}

type ValidationErrorItem = { message: string };
export type PossibleError =
  | Error
  | string
  | { message?: string }
  | { errors?: ValidationErrorItem[] };

export interface PaginationQuery {
  page?: string | number;
  limit?: string | number;
}

export interface SearchQuery extends PaginationQuery {
  search?: string;
}

export interface InboxEmailQuery extends SearchQuery {
  category?: string;
  inbox_category_id?: string;
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

export enum ResponseStatus {
  Info = 3,
  Warning = 2,
  Success = 1,
  Error = 0,
  NotFound = -1,
  Unauthorized = -2,
  Forbidden = -3,
}