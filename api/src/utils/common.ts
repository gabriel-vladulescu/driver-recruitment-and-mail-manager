import { Response } from 'express';
import { ServerResponse, PossibleError, ResponseStatus } from '../types';

/**
 * Extract meaningful message from any error type
 */
const extractErrorMessage = (error: PossibleError, fallback: string): string => {
  if (!error) return fallback;

  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }

  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle Sequelize validation errors
  if (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    Array.isArray(error.errors)
  ) {
    return error.errors.map(e => e.message).join(', ');
  }

  // Handle objects with message property
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return fallback;
};

/**
 * Log error with context for debugging
 */
const logError = (status: ResponseStatus, message: string, error?: any, context?: string): void => {
  if (process.env.NODE_ENV !== 'production' && [ResponseStatus.Error, ResponseStatus.NotFound, ResponseStatus.Unauthorized, ResponseStatus.Forbidden].includes(status)) {
    const logContext = context ? `[${context}] ` : '';
    console.error(`${logContext}${ResponseStatus[status]} (${status}): ${message}`);

    if (error) {
      if (error instanceof Error) {
        console.error('Stack:', error.stack);
      } else {
        console.error('Error details:', error);
      }
    }
  }
};

/**
 * Get HTTP status code from ResponseStatus
 */
const getHttpStatusFromResponseStatus = (status: ResponseStatus): number => {
  switch (status) {
    case ResponseStatus.Success:
    case ResponseStatus.Warning:
    case ResponseStatus.Info:
      return 200;
    case ResponseStatus.Error:
      return 400;
    case ResponseStatus.NotFound:
      return 404;
    case ResponseStatus.Unauthorized:
      return 401;
    case ResponseStatus.Forbidden:
      return 403;
    default:
      return 500;
  }
};

/**
 * Unified API Response function that handles everything based on ResponseStatus
 */
export const ApiResponse = (
  res: Response,
  status: ResponseStatus,
  dataOrMessageOrError?: any,
  message: string = '',
  httpStatusCode?: number
): Response => {
  let finalMessage: string = '';
  let stackTrace: any;
  let data: object | undefined = undefined;

  if (dataOrMessageOrError instanceof Error) {
    stackTrace = dataOrMessageOrError;
    finalMessage = typeof message === 'string' && message.length > 0
      ? message
      : extractErrorMessage(stackTrace, 'An error occurred');
  } else if (typeof dataOrMessageOrError === 'string') {
    finalMessage = dataOrMessageOrError;
  } else {
    data = dataOrMessageOrError;
    if (typeof message === 'string' && message.length > 0) {
      finalMessage = message;
    }
  }

  /**
   * Decision logic for final message
   */
  // Determine HTTP status code
  const httpStatus = httpStatusCode || getHttpStatusFromResponseStatus(status);

  // Log if it's an error
  if (stackTrace || [ResponseStatus.Error,
  ResponseStatus.NotFound,
  ResponseStatus.Unauthorized,
  ResponseStatus.Forbidden].includes(status)) {
    logError(status, finalMessage, stackTrace, ResponseStatus[status]);
  }

  // Build response
  const response: ServerResponse = { status };

  if (finalMessage.length > 0) {
    response.message = finalMessage;
  }

  if (data !== undefined) {
    response.data = data;
  }

  return res.status(httpStatus).json(response);
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
  limit: number,
  unread?: number
) => {
  const meta: any = {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };

  if (unread !== undefined) {
    meta.unread = unread;
  }

  return meta;
};