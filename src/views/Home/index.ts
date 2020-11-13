import SubscriptionsList from '@/components/SubscriptionsList/component.vue';
import links from '@/router/links';
import { Component, Vue } from 'vue-property-decorator';
import SubscriptionsListGraphqlQuery from './query.graphql';

@Component({
  components: {
    SubscriptionsList,
  },
})
export default class Home extends Vue {
  private query = SubscriptionsListGraphqlQuery;

  gotToNewSubcription() {
    this.$router.push({ name: links.subscriptions.new });
  }
}
