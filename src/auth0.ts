/* eslint-disable @typescript-eslint/camelcase */
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
  domain: process.env.VUE_APP_AUTH0_DOMAIN || 'xxx',
  redirect_uri: window.location.origin,
  client_id: process.env.VUE_APP_AUTH0_CLIENT_ID || 'xxx',
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
