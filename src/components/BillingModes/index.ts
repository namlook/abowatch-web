import { BillingMode } from '@/generated/graphql';
import {
  defineComponent, PropType, ref, watch,
} from '@vue/composition-api';

export default defineComponent({
  name: 'BillingModes',
  props: {
    value: {
      type: String as PropType<BillingMode>,
      required: true,
    },
    spaceBeetween: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const billingMode = ref(props.value);

    watch(() => props.value, (val) => {
      billingMode.value = val;
    });

    watch(billingMode, (updatedBillingMode) => {
      emit('input', updatedBillingMode);
    });

    return {
      billingMode,
    };
  },

});
