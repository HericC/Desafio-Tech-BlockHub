import React, { createContext } from 'react';
import UseAuth from '../hooks/UseAuth';
import { payloadTypes } from '../pages/Login/dto';

const AuthContext = createContext({
  authenticated: false,
  handleLogin: async (payload: payloadTypes): Promise<void> => {
    return;
  },
  handleLogout: async (): Promise<void> => {
    return;
  },
});

function AuthProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const { authenticated, handleLogin, handleLogout } = UseAuth();

  return (
    <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
