import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SubscriptionForm from '../components/SubscriptionForm/component.vue';
import Home from '../views/Home/component.vue';
import LoginPage from '../views/LoginPage/component.vue';
import links from './links';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: links.home,
    component: Home,
    props: true,
    meta: { authRequired: true },
  },
  {
    path: '/new',
    name: links.subscriptions.new,
    component: SubscriptionForm,
    props: true,
    meta: { authRequired: true },
  },
  {
    path: '/edit/:subscriptionId',
    name: links.subscriptions.edit,
    component: SubscriptionForm,
    props: true,
    meta: { authRequired: true },
  },
  {
    path: '/login',
    name: links.login,
    props: true,
    component: LoginPage,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   const { authRequired } = to.meta ?? { authRequired: false };
//   // const { isAuthenticated } = await checkAuth();
//   if (isAuthenticated && to.name === links.login) {
//     router.push({ name: links.home });
//     return;
//   }
//   if (authRequired) {
//     if (!isAuthenticated) {
//       if (from.name === links.login) {
//         return;
//       }
//       if (to.name !== links.login) {
//         router.push({ name: links.login });
//         return;
//       }
//     }
//   }
//   next();

// });

export default router;
