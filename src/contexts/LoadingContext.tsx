import React, { createContext } from 'react';
import HandleLoading from '../hooks/HandleLoading';
import Loading from '../components/Loading';

const LoadingContext = createContext({
  handleLoading: (isLoading: boolean): void => {
    return;
  },
});

function LoadingProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const { loading, handleLoading } = HandleLoading();

  return (
    <LoadingContext.Provider value={{ handleLoading }}>
      {children}
      <Loading isLoading={loading} />
    </LoadingContext.Provider>
  );
}

export { LoadingContext, LoadingProvider };
