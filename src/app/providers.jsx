'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../redux/store'

export const Providers = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ReduxProvider>
    
  )
}