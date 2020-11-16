import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { useSubscriptionsListDeleteSubscriptionMutation, useSubscriptionsListQuery } from '@/generated/graphql';
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
    /**
     * Fetch subscriptions
     */
    const {
      result,
      loading,
      error,
      refetch: refetchSubscriptions,
    } = useSubscriptionsListQuery({ fetchPolicy: 'cache-and-network' });
    const subscriptions = useResult(result, [], (data) => data.subscriptions);

    /**
     * Handle subscription deletion
     */
    const { mutate: deleteSubscription, onDone: onSubscriptionDeleted } = useSubscriptionsListDeleteSubscriptionMutation({});

    const onDeleteSubscription = (subscriptionId: string) => {
      deleteSubscription({ id: subscriptionId });
      onSubscriptionDeleted(refetchSubscriptions);
    };

    /**
     * Some links
     */
    const goToNewSubscriptionPage = () => router.push({ name: links.subscriptions.new });

    return {
      subscriptions,
      loading,
      error,
      goToNewSubscriptionPage,
      onDeleteSubscription,

    };
  },
});
