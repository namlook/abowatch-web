import { DefaultApolloClient } from '@vue/apollo-composable';
import { provide } from '@vue/composition-api';
import Vue from 'vue';
import ApolloClient from './apollo';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  setup() {
    provide(DefaultApolloClient, ApolloClient);
  },
  render: (h) => h(App),
}).$mount('#app');
