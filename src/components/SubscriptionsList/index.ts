import { Subscription } from '@/generated/graphql';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'SubscriptionsList',
  props: {
    subscriptions: {
      type: Array as PropType<Subscription[]>,
      required: true,
    },
  },
});
