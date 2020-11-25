import { useAuth0 } from '@/modules/auth';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const { login } = useAuth0();
    return {
      login,
    };
  },

});
