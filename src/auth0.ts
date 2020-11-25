/* eslint-disable @typescript-eslint/camelcase */
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '@/config';
import createAuth0Client from '@auth0/auth0-spa-js';

export interface Auth0User {
    email: string;
    email_verified: boolean;
    name: string;
    nickname: string;
    picture: string;
    sub: string;
    updated_at: string;
}

const DEFAULT_OPTIONS = {
  domain: AUTH0_DOMAIN,
  redirect_uri: window.location.origin,
  client_id: AUTH0_CLIENT_ID,
};

export default {
  async createClient(options = DEFAULT_OPTIONS) {
    const client = await createAuth0Client(options);
    const user: Auth0User = await client.getUser();
    return {
      client,
      isAuthenticated: !!user,
      user,
    };
  },
};
