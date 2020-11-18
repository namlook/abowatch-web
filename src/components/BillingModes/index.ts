import { BillingMode } from '@/generated/graphql';
import {
  defineComponent, PropType, ref, watch,
} from '@vue/composition-api';

export default defineComponent({
  name: 'BillingModes',
  props: {
    value: {
      type: String as PropType<BillingMode>,
      default: BillingMode.Monthly,
    },
  },

  setup({ value }, { emit }) {
    const billingMode = ref(value);

    watch(billingMode, (updatedBillingMode) => {
      emit('input', updatedBillingMode);
    });

    return {
      billingMode,
    };
  },

});
