import Auth0 from '@/auth0';
import { AUTH0_AUDIENCE, AUTH_TOKEN_NAME } from '@/config';
import router from '@/router';
import links from '@/router/links';
import { Auth0Client } from '@auth0/auth0-spa-js';
import {
  nextTick, ref,
} from '@vue/composition-api';

const username = ref('');
const isAuthenticated = ref(false);
const isAuthenticating = ref(true);

let auth0Client: Auth0Client;

export const useAuth0 = () => {
  if (!auth0Client) {
    isAuthenticating.value = true;
    Auth0.createClient().then(async ({
      isAuthenticated: auth0IsAuthenticated, user, client,
    }) => {
      auth0Client = client;
      if (auth0IsAuthenticated) {
        const token = await auth0Client.getTokenSilently({ audience: AUTH0_AUDIENCE });
        window.localStorage.setItem(AUTH_TOKEN_NAME, token);
      }

      isAuthenticating.value = false;
      if (auth0IsAuthenticated) {
        isAuthenticated.value = true;
        username.value = user.email;
      } else {
        isAuthenticated.value = false;
        username.value = '';
      }
    });
  } else {
    nextTick(() => {
      isAuthenticating.value = false;
    });
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_NAME);
    isAuthenticated.value = false;
    username.value = '';
    auth0Client.logout();
  };

  const login = async () => {
    let token: string;
    try {
      await auth0Client.loginWithPopup();
      token = await auth0Client.getTokenSilently({ audience: AUTH0_AUDIENCE });
    } catch (e) {
      console.error('XXX', e);
      await auth0Client.loginWithPopup({
        prompt: 'consent',
        audience: AUTH0_AUDIENCE,
      });
      token = await auth0Client.getTokenSilently({ audience: AUTH0_AUDIENCE });
    }
    if (token && token !== window.localStorage.getItem(AUTH_TOKEN_NAME)) {
      window.localStorage.setItem(AUTH_TOKEN_NAME, token);
    }
    const user = await auth0Client.getUser();
    if (user) {
      isAuthenticated.value = true;
      username.value = user.email;

      if (router.currentRoute.name !== links.home) {
        router.push({ name: links.home });
      }
    }
  };

  return {
    isAuthenticated,
    isAuthenticating,
    username,
    logout,
    login,
  };
};
