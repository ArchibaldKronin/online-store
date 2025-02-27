import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="container">
      <h1>Whoooops Something Goes Wrong</h1>
      {isRouteErrorResponse(error) ? (
        <>
          <p>{error.status}</p>
          <p>{error.statusText}</p>
        </>
      ) : error instanceof Error ? (
        <p>{error.message}</p>
      ) : (
        <p>Unexpected error</p>
      )}
    </div>
  );
};

export default ErrorPage;
