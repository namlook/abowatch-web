import {
  Subscription,
} from '@/generated/graphql';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  //   apollo: {
  //     subscriptions: SubscriptionsListQuery,
  //   },
})
export default class SubscriptionsList extends Vue {
  @Prop({ type: Array, required: true }) subscriptions!: Subscription[]

  // async mounted() {
  //   const { data, errors } = await this.$apollo.query<
  //     SubscriptionsListQuery,
  //     SubscriptionsListQueryVariables
  //   >({
  //     query: SubscriptionsListQueryGraphql,
  //   });

  //   if (errors) {
  //     console.log('XXX', errors);
  //   }

  //   this.subscriptions = data.subscriptions ?? [];
  // }
}
