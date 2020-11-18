import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { Subscription, useSubscriptionsListQuery } from '@/generated/graphql';
import links from '@/router/links';
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent } from '@vue/composition-api';

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

    const subscriptions = useResult(result, null, (data) => data.subscriptions);

    /**
     * Some links
     */
    const newSubscriptonLink = { name: links.subscriptions.new };

    const totalPrice = computed(() => (subscriptions.value ? subscriptions.value.reduce(
      (acc: number, item: Subscription) => acc + item.price, 0,
    ) : 0));

    return {
      subscriptions,
      loading,
      error,
      newSubscriptonLink,
      totalPrice,
    };
  },
});
