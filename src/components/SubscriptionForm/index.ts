import {
  BillingMode,
  SubscriptionFormQuery,
  SubscriptionFormQueryVariables,
  SubscriptionFormSaveSubscriptionMutationVariables,
  SubscriptionInput,
} from '@/generated/graphql';
import links from '@/router/links';
import { Component, Prop, Vue } from 'vue-property-decorator';
import SubscriptionGraphqlQuery from './query.graphql';
import SaveSubscriptionGraphqlMutation from './save.mutation.graphql';

@Component({
  //   apollo: {
  //     subscription: {
  //       query: SubscriptionQuery,
  //       variables(): SubscriptionFormQueryVariables {
  //         return {
  //           id: this.subscriptionId,
  //         };
  //       },
  //       result({ data }) {
  //         console.log('data', data);
  //         if (!data) {
  //           return;
  //         }
  //         const {
  //           name, price, billingMode, dividedBy,
  //         } = data.subscription;
  //         this.form = {
  //           name,
  //           price,
  //           billingMode,
  //           dividedBy,
  //         };
  //       },
  //     },
  //   },
})
export default class SubscriptionsList extends Vue {
  @Prop({ type: String }) readonly subscriptionId!: string;

  loading = false
  // query = SubscriptionGraphqlQuery

  // queryVariables(): SubscriptionFormQueryVariables {
  //   return {
  //     id: this.subscriptionId,
  //   };
  // }

  mutation = SaveSubscriptionGraphqlMutation

  private form: SubscriptionInput = {
    name: '',
    price: 0,
    dividedBy: 1,
    billingMode: BillingMode.Daily,
  };

  async mounted() {
    this.loading = true;

    const { data, errors } = await this.$apollo.query<
      SubscriptionFormQuery,
      SubscriptionFormQueryVariables
    >({
      query: SubscriptionGraphqlQuery,
      variables: {
        id: this.subscriptionId,
      },
    });

    this.loading = false;

    if (errors) {
      console.log('XXXX', errors);
      return;
    }

    if (data.subscription) {
      const {
        name, price, dividedBy, billingMode,
      } = data.subscription;
      this.form = {
        name,
        price,
        dividedBy,
        billingMode,
      };
    }
  }

  get mutationVariables(): SubscriptionFormSaveSubscriptionMutationVariables {
    return {
      input: this.form,
      id: this.subscriptionId,
    };
  }

  onSave() {
    this.$router.push({ name: links.home });
  }

  // async save() {
  //   const { data, errors } = await this.$apollo.mutate<
  //     SubscriptionFormSaveSubscriptionMutation,
  //     SubscriptionFormSaveSubscriptionMutationVariables
  //   >({
  //     mutation: SaveSubscriptionMutation,
  //     variables: {
  //       input: this.form,
  //       id: this.subscriptionId,
  //     },
  //   });

  //   if (errors) {
  //     console.log('XXXX', errors);
  //   }

  //   console.log(data);
  //   this.$router.push({ name: links.subscriptions.list });
  // }
}
