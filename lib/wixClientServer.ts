import { OAuthStrategy, createClient } from '@wix/sdk';
import { collections, products } from '@wix/stores';
import { cookies } from 'next/headers';

export async function wixClientServer() {
  let refreshToken;
  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(cookieStore.get('refreshToken')?.value || '{}');
  } catch (error) {
    console.error(error);
  }
  const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: '', expiresAt: 0 },
      },
    }),
  });
  return wixClient;
}
