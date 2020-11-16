import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SubscriptionForm from '../components/SubscriptionForm/component.vue';
import Home from '../views/Home/component.vue';
import links from './links';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/new',
    name: links.subscriptions.new,
    component: SubscriptionForm,
  },
  {
    path: '/edit/:subscriptionId',
    name: links.subscriptions.edit,
    component: SubscriptionForm,
    props: true,
  },
  {
    path: '/about',
    name: links.about,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
