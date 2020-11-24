import Auth0 from '@/auth0';
import router from '@/router';
import links from '@/router/links';
import { Auth0Client } from '@auth0/auth0-spa-js';
import {
  nextTick, ref,
} from '@vue/composition-api';

// const AUTH_KEY = 'abowatch_token';

const username = ref('');
const userToken = ref('');
const isAuthenticated = ref(false);
const isAuthenticating = ref(true);

// const $auth0 = useAuth0Plugin({
//   redirectUri: window.location.origin,
//   domain: process.env.VUE_APP_AUTH0_DOMAIN,
//   clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
//   onRedirectCallback: (appState: {targetUrl: string}) => {
//     console.log('.....', window.location.pathname, appState.targetUrl);
//     router.push(
//       appState && appState.targetUrl
//         ? appState.targetUrl
//         : window.location.pathname,
//     );
//   },
// });

let auth0Client: Auth0Client;

export const useAuth0 = () => {
  if (!auth0Client) {
    isAuthenticating.value = true;
    Auth0.createClient().then(({ isAuthenticated: auth0IsAuthenticated, user, client }) => {
      auth0Client = client;
      isAuthenticating.value = false;
      if (auth0IsAuthenticated) {
        isAuthenticated.value = true;
        username.value = user.email;
        userToken.value = user.sub;
      } else {
        isAuthenticated.value = false;
        username.value = '';
        userToken.value = '';
      }
    });
  } else {
    nextTick(() => {
      isAuthenticating.value = false;
    });
  }

  const logout = async () => {
    await auth0Client.logout();
    isAuthenticated.value = false;
    username.value = '';
    userToken.value = '';
  };

  const login = async () => {
    try {
      await auth0Client.loginWithPopup();
    } catch (e) {
      console.error('XXX', e);
    } finally {
      const user = await auth0Client.getUser();
      if (user) {
        isAuthenticated.value = true;
        username.value = user.email;
        userToken.value = user.sub;
        if (router.currentRoute.name !== links.home) {
          router.push({ name: links.home });
        }
      }
    }
  };

  return {
    userToken,
    isAuthenticated,
    isAuthenticating,
    username,
    logout,
    login,
  };
};

// export const checkAuth = async () => {
//   const token = window.localStorage.getItem(AUTH_KEY) ?? '';
//   const { data } = await apolloClient.query<AuthQuery, AuthQueryVariables>({ query: AuthDocument, variables: { token } });
//   const fetchedUsername = data.user?.username ?? '';
//   isAuthenticated.value = !!fetchedUsername;
//   if (isAuthenticated.value) {
//     userToken.value = token;
//     username.value = fetchedUsername;
//   }
//   return { isAuthenticated: isAuthenticated.value, userToken: token };
// };

// export const useAuth = () => {
//   // const token = window.localStorage.getItem(AUTH_KEY) ?? '';
//   // const {
//   //   loading, error, onResult,
//   // } = provideApolloClient(apolloClient)(() => useAuthQuery({ token }));

//   const setUser = (user: { username: string; token: string}) => {
//     window.localStorage.setItem(AUTH_KEY, user.token);
//     username.value = user.username;
//     userToken.value = user.token;
//     isAuthenticated.value = true;
//   };

//   const logout = async () => {
//     await apolloClient.mutate({ mutation: LogoutDocument, variables: { token: userToken.value } });
//     window.localStorage.removeItem(AUTH_KEY);
//     username.value = '';
//     userToken.value = '';
//     isAuthenticated.value = false;
//   };

//   return {
//     username, isAuthenticated, userToken, setUser, logout,
//   };
// };
