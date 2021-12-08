import { createContext, useState } from "react";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";

export const ErrorBoundaryContext = createContext();

export const ErrorBoundaryProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const changeError = (newError) => setError(newError);

  const value = {
    error,
    changeError,
  };

  return (
    <ErrorBoundaryContext.Provider value={value}>
      <ErrorBoundary error={error} changeError={changeError}>
        {children}
      </ErrorBoundary>
    </ErrorBoundaryContext.Provider>
  );
};
