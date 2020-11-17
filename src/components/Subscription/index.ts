import { Subscription } from '@/generated/graphql';
import links from '@/router/links';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'Subscription',

  props: {
    value: {
      type: Object as PropType<Subscription>,
      required: true,
    },
  },

  setup({ value: subscription }) {
    const editSubscriptionLink = {
      name: links.subscriptions.edit,
      params: { subscriptionId: subscription.id },
    };

    return {
      editSubscriptionLink,
    };
  },
});
