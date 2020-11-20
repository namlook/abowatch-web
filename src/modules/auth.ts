import apolloClient from '@/apollo';
import {
  AuthDocument, AuthQuery, AuthQueryVariables, LogoutDocument,
} from '@/generated/graphql';
import { ref } from '@vue/composition-api';

const AUTH_KEY = 'abowatch_token';

const username = ref('');
const userToken = ref('');
const isAuthenticated = ref(false);

export const checkAuth = async () => {
  const token = window.localStorage.getItem(AUTH_KEY) ?? '';
  const { data } = await apolloClient.query<AuthQuery, AuthQueryVariables>({ query: AuthDocument, variables: { token } });
  const fetchedUsername = data.user?.username ?? '';
  isAuthenticated.value = !!fetchedUsername;
  if (isAuthenticated.value) {
    userToken.value = token;
    username.value = fetchedUsername;
  }
  return { isAuthenticated: isAuthenticated.value, userToken: token };
};

export const useAuth = () => {
  // const token = window.localStorage.getItem(AUTH_KEY) ?? '';
  // const {
  //   loading, error, onResult,
  // } = provideApolloClient(apolloClient)(() => useAuthQuery({ token }));

  const setUser = (user: { username: string; token: string}) => {
    window.localStorage.setItem(AUTH_KEY, user.token);
    username.value = user.username;
    userToken.value = user.token;
    isAuthenticated.value = true;
  };

  const logout = async () => {
    await apolloClient.mutate({ mutation: LogoutDocument, variables: { token: userToken.value } });
    window.localStorage.removeItem(AUTH_KEY);
    username.value = '';
    userToken.value = '';
    isAuthenticated.value = false;
  };

  // onResult((response) => {
  //   const theUserName = response.data.user?.username ?? '';
  //   if (theUserName) {
  //     console.log('ooooo', response, theUserName);
  //     setUser({ username: theUserName, token });
  //   } else {
  //     window.localStorage.removeItem(AUTH_KEY);
  //     username.value = '';
  //     userToken.value = '';
  //     isAuthenticated.value = false;
  //   }
  //   isAuthenticating.value = false;
  // });

  return {
    username, isAuthenticated, userToken, setUser, logout,
  };
};
