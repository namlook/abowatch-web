import { useAuth } from '@/modules/auth';
import router from '@/router';
import links from '@/router/links';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',

  setup() {
    const { isAuthenticated, username, logout } = useAuth();

    const goToHome = () => router.push({ name: links.home });
    const aboutLink = { name: links.about };

    const onLogout = async () => {
      await logout();
      router.push({ name: links.login });
    };

    const loginLink = { name: links.login };

    return {
      goToHome,
      username,
      aboutLink,
      loginLink,
      isAuthenticated,
      onLogout,
    };
  },
});
