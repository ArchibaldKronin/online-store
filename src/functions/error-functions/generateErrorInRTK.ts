import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export default function generateErrorInRTK(error: unknown): { error: FetchBaseQueryError } {
  let errorMessage = 'Ошибка запроса';
  let statusCode: number = 520;
  let statusText = 'Неизвестная ошибка';

  if (error instanceof Error) {
    statusText = error.name || 'Ошибка сети';
    errorMessage = error.message;
  }

  if (typeof error === 'object' && error !== null && 'status' in error) {
    statusCode = error.status as number;
    statusText = (error as { statusText?: string }).statusText || 'Неизвестная ошибка';
  }

  return {
    error: {
      status: statusCode,
      data: {
        message: errorMessage,
        statusText,
      },
    },
  };
}
