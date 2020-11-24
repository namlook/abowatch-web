import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import Vue from 'vue';
import ApolloClient from './apollo';
import App from './App/component.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

// declare module 'vue/types/vue' {

//   interface Vue {
//     $auth: {
//       isAuthenticated: boolean;
//       user: Auth0User;
//       logout(): void;
//       loginWithRedirect(): void;
//     };
//   }

//   interface VueConstructor {
//     $auth: {
//       isAuthenticated: boolean;
//       user: unknown;
//       logout(): void;
//       loginWithRedirect(): void;
//     };
//   }
// }

// Vue.use(Auth0Plugin, {
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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  setup() {
    provide(DefaultApolloClient, ApolloClient);
  },
  render: (h) => h(App),
}).$mount('#app');
