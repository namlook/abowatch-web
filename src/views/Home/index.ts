import BillingModes from '@/components/BillingModes/component.vue';
import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import { BillingMode, Subscription, useSubscriptionsListQuery } from '@/generated/graphql';
import { useAuth0 } from '@/modules/auth';
import links from '@/router/links';
import { billingModeRatios } from '@/utils';
import { useResult } from '@vue/apollo-composable';
import { computed, defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Home',

  components: {
    SubscriptionsList,
    BillingModes,
  },

  setup() {
    useAuth0();

    /**
     * Fetch subscriptions
     */
    const {
      result,
      loading,
      error,
    } = useSubscriptionsListQuery({ fetchPolicy: 'cache-and-network' });

    const subscriptions = computed(() => useResult(result, null, (data) => data.subscriptions).value ?? []);

    /**
     * Total
     */

    const billingMode = ref(BillingMode.Monthly);

    const dailyPrice = computed(() => subscriptions.value.reduce(
      (acc: number, item: Pick<Subscription, 'dailyPrice'>) => acc + item.dailyPrice, 0,
    ));

    const priceForBillingMode = computed(() => (dailyPrice.value * billingModeRatios[billingMode.value]).toFixed(2));

    const hasSplit = computed(() => !!subscriptions.value.find((item: Subscription) => item.split > 1));

    const splitPrice = computed(() => subscriptions.value.reduce(
      (acc: number, item: Pick<Subscription, 'dailyPrice' | 'split'>) => acc + (item.dailyPrice / item.split), 0,
    ));

    const splitPriceForBillingMode = computed(() => (hasSplit && splitPrice.value * billingModeRatios[billingMode.value]).toFixed(2));

    const newSubscriptonLink = { name: links.subscriptions.new };

    return {
      subscriptions,
      loading,
      error,
      billingMode,
      dailyPrice,
      hasSplit,
      priceForBillingMode,
      splitPriceForBillingMode,
      newSubscriptonLink,
    };
  },
});
