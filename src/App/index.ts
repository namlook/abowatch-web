import router from '@/router';
import links from '@/router/links';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'App',

  setup() {
    const goToHome = () => router.push({ name: links.home });
    const aboutLink = { name: links.about };

    return {
      goToHome,
      aboutLink,
    };
  },
});
