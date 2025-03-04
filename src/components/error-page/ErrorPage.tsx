import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

type ErrorPageProps = {
  er: FetchBaseQueryError | Error | SerializedError | string;
};

type ErrorObject = {
  errorStatus?: number;
  errorName?: string;
  statusText?: string;
  errorMessage?: string;
};

const ErrorPage: FC<ErrorPageProps> = ({ er }) => {
  const routeError = useRouteError();
  const error = er || routeError;

  const errorObject: ErrorObject = {};

  //RTK
  if (typeof error === 'object' && error !== null && 'status' in error) {
    errorObject.errorName = 'Ошибка RTK Query';
    errorObject.errorStatus = error.status as number;
    if (
      'data' in error &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'message' in error.data
    ) {
      if ('statusText' in error.data) {
        errorObject.statusText = (error.data as { statusText: string }).statusText;
      }
      errorObject.errorMessage = (error.data as { message: string }).message;
    }
  }
  //Router
  if (isRouteErrorResponse(error)) {
    errorObject.errorName = 'Ошибка React Router';
    errorObject.errorStatus = error.status;
    errorObject.statusText = error.statusText;
  }
  //JS
  if (error instanceof Error) {
    errorObject.errorName = error.name;
    errorObject.errorMessage = error.message;
  }
  //String
  if (typeof error === 'string') {
    errorObject.errorName = 'Выброшена строка';
    errorObject.errorMessage = error;
  }

  return (
    <div className="container">
      <h1>Whoooops Something Goes Wrong</h1>
      <h2>{errorObject.errorName}</h2>
      {errorObject.errorStatus && <h3>{errorObject.errorStatus}</h3>}
      {errorObject.statusText && <p>{errorObject.statusText}</p>}
      {errorObject.errorMessage && <p>{errorObject.errorMessage}</p>}
    </div>
  );
};

export default ErrorPage;
