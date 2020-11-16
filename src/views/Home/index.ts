import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { useSubscriptionsListQuery } from '@/generated/graphql';
import router from '@/router';
import links from '@/router/links';
import { useResult } from '@vue/apollo-composable';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',

  components: {
    SubscriptionsList,
  },

  setup() {
    const { result, loading, error } = useSubscriptionsListQuery({
      fetchPolicy: 'cache-and-network',
    });

    const subscriptions = useResult(result, [], (data) => data.subscriptions);

    const goToNewSubscriptionPage = () => router.push({ name: links.subscriptions.new });

    return {
      subscriptions,
      loading,
      error,
      goToNewSubscriptionPage,
    };
  },
});
