import {
  BillingMode,
  useSubscriptionFormDeleteMutation,
  useSubscriptionFormQuery,
  useSubscriptionFormSaveMutation,
} from '@/generated/graphql';
import router from '@/router';
import links from '@/router/links';
import { useResult } from '@vue/apollo-composable';
import { defineComponent, reactive, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'SubscriptionForm',

  props: {
    subscriptionId: {
      type: String,
    },
  },

  setup({ subscriptionId }) {
    /*
     * The form that will serve as SubscriptionInput mutation input
     */
    const form = reactive({
      name: '',
      price: 0,
      dividedBy: 1,
      billingMode: 'monthly',
    });

    /**
     * Load the subscription if an ID is passed
     */
    const {
      result: queryResult,
      loading: queryLoading,
      error: queryError,
    } = useSubscriptionFormQuery({ id: subscriptionId }, { fetchPolicy: 'cache-and-network' });

    const subscriptionResult = useResult(queryResult, null, (o) => o.subscription);

    /**
     * Fill the form with the subscription fields
     */
    watch(subscriptionResult, (value) => {
      if (value) {
        form.billingMode = value.billingMode;
        form.name = value.name;
        form.price = value.price;
        form.dividedBy = value.dividedBy;
      }
    });

    /**
     * The mutation that will save the subscription
     */
    const {
      mutate: saveSubscription,
      loading: mutationLoading,
      error: mutationError,
      onDone: onSubscriptionSaved,
    } = useSubscriptionFormSaveMutation({
      variables: {
        input: form,
        id: subscriptionId,
      },
    });

    /**
     * When the save button is clicked, go back to the home page
     */
    onSubscriptionSaved(() => {
      router.push({ name: links.home });
    });

    /**
     * Handle subscription deletion
     */
    const {
      mutate: deleteSubscription,
      onDone: onSubscriptionDeleted,
      loading: deleteSubscriptionLoading,
    } = useSubscriptionFormDeleteMutation({ variables: { id: subscriptionId } });

    onSubscriptionDeleted(() => router.push({ name: links.home }));

    /**
     * Misc
     */

    const billingModes: {text: string; value: BillingMode}[] = [
      { text: 'Quotidienne', value: BillingMode.Daily },
      { text: 'Hebdomadaire', value: BillingMode.Weekly },
      { text: 'Mensuelle', value: BillingMode.Monthly },
      { text: 'Trimestrielle', value: BillingMode.Quaterly },
      { text: 'Annuelle', value: BillingMode.Yearly },
    ];

    const homeLink = { name: links.home };

    return {
      form,
      queryLoading,
      queryError,
      saveSubscription,
      mutationLoading,
      mutationError,
      billingModes,
      homeLink,
      deleteSubscription,
      deleteSubscriptionLoading,
    };
  },
});
