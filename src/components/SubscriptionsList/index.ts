import SubscriptionComponent from '@/components/Subscription/component.vue';
import { Subscription } from '@/generated/graphql';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'SubscriptionsList',

  components: {
    Subscription: SubscriptionComponent,
  },

  props: {
    subscriptions: {
      type: Array as PropType<Subscription[]>,
      required: true,
    },
  },

});
