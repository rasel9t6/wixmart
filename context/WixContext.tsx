'use client';
import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
import Cookies from 'js-cookie';
import { createContext, ReactNode } from 'react';

// Initialize wixClient
const refreshToken = JSON.parse(Cookies.get('refreshToken') || '{}');
const wixClient = createClient({
  modules: {
    products,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: {
      refreshToken,
      accessToken: { value: '', expiresAt: 0 },
    },
  }),
});

// Define the type of wixClient without generic type arguments
export type WixClientType = typeof wixClient;

// Create the context with an initial value of null
export const WixClientContext = createContext<WixClientType>(wixClient);

export const WixClientProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
