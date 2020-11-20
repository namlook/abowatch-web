import { RegisterFormMutation, useRegisterFormMutation } from '@/generated/graphql';
import { useAuth } from '@/modules/auth';
import router from '@/router';
import links from '@/router/links';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'RegisterForm',
  setup() {
    const formErrors = ref('');
    const form = reactive({
      username: '',
      password: '',
    });

    const {
      mutate: register,
      loading: registerLoading,
      onDone,
    } = useRegisterFormMutation({ variables: form });

    const { setUser } = useAuth();

    onDone((response: { data: RegisterFormMutation}) => {
      if (response.data.register) {
        const { userToken, error } = response.data.register;
        if (userToken) {
          setUser({ username: form.username, token: userToken });
          router.push({ name: links.home });
        } else if (error) {
          formErrors.value = error;
        }
      }
    });

    const loginLink = { name: links.login };

    return {
      form,
      formErrors,
      registerLoading,
      register,
      loginLink,
    };
  },
});
