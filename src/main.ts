import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import Vue from 'vue';
import ApolloClient from './apollo';
import App from './App/component.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

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
