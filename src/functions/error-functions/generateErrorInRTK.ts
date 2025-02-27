import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function generateErrorInRTK(error: unknown): { error: FetchBaseQueryError } {
  let errorMessage = 'Ошибка запроса';
  let statusCode: string | number = 'UNKNOWN_ERROR';

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (typeof error === 'object' && error !== null && 'response' in error) {
    const response = (error as { response?: { status?: number } }).response;
    if (response?.status) {
      statusCode = response.status;
    }
  }

  return {
    error: {
      status: statusCode,
      data: { message: errorMessage },
    } as FetchBaseQueryError,
  };
}
