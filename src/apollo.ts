import ApolloClient from 'apollo-boost';
import Vue from 'vue';
import VueApollo from 'vue-apollo';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

export default new VueApollo({
  defaultClient: apolloClient,
});
