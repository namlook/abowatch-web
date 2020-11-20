import { LoginFormMutation, useLoginFormMutation } from '@/generated/graphql';
import { useAuth } from '@/modules/auth';
import router from '@/router';
import links from '@/router/links';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const formErrors = ref('');
    const form = reactive({
      username: '',
      password: '',
    });

    const {
      mutate: login,
      loading: loginLoading,
      onDone,
    } = useLoginFormMutation({ variables: form });

    const { setUser } = useAuth();

    onDone((response: { data: LoginFormMutation}) => {
      if (response.data.login) {
        const { userToken, error } = response.data.login;
        if (userToken) {
          setUser({ username: form.username, token: userToken });
          router.push({ name: links.home });
        } else if (error) {
          formErrors.value = error;
        }
      }
    });

    const registerLink = { name: links.register };

    return {
      form,
      formErrors,
      loginLoading,
      login,
      registerLink,
    };
  },
});
