import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { useSubscriptionsListQuery } from '@/generated/graphql';
import links from '@/router/links';
import { useResult } from '@vue/apollo-composable';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',

  components: {
    SubscriptionsList,
  },

  setup() {
    /**
     * Fetch subscriptions
     */
    const {
      result,
      loading,
      error,
    } = useSubscriptionsListQuery({ fetchPolicy: 'cache-and-network' });

    const subscriptions = useResult(result, [], (data) => data.subscriptions);

    /**
     * Some links
     */
    const newSubscriptonLink = { name: links.subscriptions.new };

    return {
      subscriptions,
      loading,
      error,
      newSubscriptonLink,
    };
  },
});
