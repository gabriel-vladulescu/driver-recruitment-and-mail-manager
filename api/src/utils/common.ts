import { Response } from 'express';
import { ApiResponse } from '../types';

/**
 * Send a standardized error response
 */
export const sendErrorResponse = (
  res: Response, 
  statusCode: number, 
  message: string, 
  error?: any
): void => {
  if (error && process.env.NODE_ENV !== 'production') {
    console.error(`Error [${statusCode}]:`, error);
  }
  
  res.status(statusCode).json({
    success: false,
    message
  } as ApiResponse);
};

/**
 * Send a standardized success response
 */
export const sendSuccessResponse = <T>(
  res: Response, 
  data?: T, 
  message?: string, 
  statusCode: number = 200
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  } as ApiResponse<T>);
};

/**
 * Validate entity existence and return 404 if not found
 */
export const validateEntityExists = (
  entity: any, 
  res: Response, 
  entityName: string = 'Înregistrarea'
): boolean => {
  if (!entity) {
    sendErrorResponse(res, 404, `${entityName} nu a fost găsită`);
    return false;
  }
  return true;
};

/**
 * Validate required fields in request body
 */
export const validateRequiredFields = (
  data: any, 
  requiredFields: string[], 
  res: Response
): boolean => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    sendErrorResponse(
      res, 
      400, 
      `Câmpurile următoare sunt obligatorii: ${missingFields.join(', ')}`
    );
    return false;
  }
  
  return true;
};

/**
 * Sanitize search input for SQL LIKE queries
 */
export const sanitizeSearchInput = (search: string): string => {
  return search.toString().replace(/[%_\\]/g, '\\$&');
};

/**
 * Parse pagination parameters with validation
 */
export const parsePaginationParams = (page?: string | number, limit?: string | number) => {
  const parsedPage = Math.max(1, parseInt(page?.toString() || '1'));
  const parsedLimit = Math.min(100, Math.max(1, parseInt(limit?.toString() || '20'))); // Max 100 items per page
  const offset = (parsedPage - 1) * parsedLimit;
  
  return { page: parsedPage, limit: parsedLimit, offset };
};

/**
 * Calculate pagination metadata
 */
export const calculatePaginationMeta = (
  total: number, 
  page: number, 
  limit: number
) => {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};