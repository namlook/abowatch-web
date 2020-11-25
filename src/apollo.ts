import { AUTH_TOKEN_NAME, GRAPHQL_ENDPOINT_URL } from '@/config';
import ApolloClient from 'apollo-boost';

const apolloClient = new ApolloClient({
  uri: GRAPHQL_ENDPOINT_URL,
  request: (operation) => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    operation.setContext({
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });
  },
});

export default apolloClient;
