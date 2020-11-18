import BillingModes from '@/components/BillingModes/component.vue';
import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { BillingMode, Subscription, useSubscriptionsListQuery } from '@/generated/graphql';
import { billingModeRatios } from '@/utils';
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',

  components: {
    SubscriptionsList,
    BillingModes,
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
     * Total
     */

    const state = reactive({
      billingMode: BillingMode.Monthly,
    });

    const dailyPrice = computed(() => (subscriptions.value ? subscriptions.value.reduce(
      (acc: number, item: Pick<Subscription, 'dailyPrice'>) => acc + item.dailyPrice, 0,
    ) : 0));

    const priceForBillingMode = computed(() => (dailyPrice.value * billingModeRatios[state.billingMode]).toFixed(2));

    const hasSplit = computed(() => {
      const items = subscriptions.value ? subscriptions.value : [];
      return !!items.find((item) => item.split > 1);
    });

    const splitPrice = computed(() => (hasSplit && subscriptions.value ? subscriptions.value.reduce(
      (acc: number, item: Pick<Subscription, 'dailyPrice' | 'split'>) => acc + (item.dailyPrice / item.split), 0,
    ) : 0));

    const splitPriceForBillingMode = computed(() => (hasSplit && splitPrice.value * billingModeRatios[state.billingMode]).toFixed(2));

    return {
      subscriptions,
      loading,
      error,
      state,
      dailyPrice,
      hasSplit,
      priceForBillingMode,
      splitPriceForBillingMode,
    };
  },
});
