import { useAuth0 } from '@/modules/auth';
import router from '@/router';
import links from '@/router/links';
import { computed, defineComponent, watchEffect } from '@vue/composition-api';

export default defineComponent({
  name: 'App',

  setup(_, ctx) {
    const {
      isAuthenticated, isAuthenticating, username, logout,
    } = useAuth0();

    const authRequired = computed(() => ctx.root.$route.meta?.authRequired ?? false);

    watchEffect(() => {
      if (authRequired.value && !isAuthenticating.value && !isAuthenticated.value) {
        router.push({ name: links.login });
      }
    });

    const goToHome = () => router.push({ name: links.home });

    return {
      goToHome,
      authRequired,
      username,
      isAuthenticated,
      isAuthenticating,
      logout,
    };
  },
});
