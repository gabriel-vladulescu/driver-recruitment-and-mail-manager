export enum StatusTypes {
    Info = 3,
    Warning = 2,
    Success = 1,
    Error = 0,
    NotFound = -1,
    Unauthorized = -2,
    Forbidden = -3,
};

export type ToastType = 'info' | 'warning' | 'success' | 'error';

export type ServerResponse = {
    status: StatusTypes,
    message: string,
}