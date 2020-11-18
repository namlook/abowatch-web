import SubscriptionComponent from '@/components/Subscription/component.vue';
import { Subscription } from '@/generated/graphql';
import links from '@/router/links';
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

  setup() {
    const newSubscriptonLink = { name: links.subscriptions.new };

    return {
      newSubscriptonLink,
    };
  },

});
