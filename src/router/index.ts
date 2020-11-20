import LoginForm from '@/components/LoginForm/component.vue';
import RegisterForm from '@/components/RegisterForm/component.vue';
import { checkAuth } from '@/modules/auth';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SubscriptionForm from '../components/SubscriptionForm/component.vue';
import Home from '../views/Home/component.vue';
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
    component: LoginForm,
    props: true,
  },
  {
    path: '/register',
    name: links.register,
    component: RegisterForm,
    props: true,
  },
  {
    path: '/about',
    name: links.about,
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(async (to, from, next) => {
  // const { userToken: userTokenRef } = useAuth();
  // const userToken = userTokenRef.value;
  const { authRequired } = to.meta ?? { authRequired: false };

  const { isAuthenticated, userToken } = await checkAuth();

  if (authRequired) {
    if (!isAuthenticated && from.name !== links.login) {
      router.push({ name: links.login, params: { userToken } });
      return;
    }
  }
  next();
});

export default router;
