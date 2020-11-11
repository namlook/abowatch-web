<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ greetings }}</h2>
    <input type="number" v-model.number="step" min="0" />
    <button @click="increment">{{ counter }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { GreetingsQueryVariables, IncrementMutation, IncrementMutationVariables } from '@/generated/graphql';
import GREETINGS_QUERY from './greetings.graphql';
import COUNTER_QUERY from './counter.graphql';
import INCREMENT_MUTATION from './increment.mutation.graphql';

@Component({
  apollo: {
    greetings: {
      query: GREETINGS_QUERY,
      variables(): GreetingsQueryVariables {
        return {
          name: this.name,
        };
      },
    },
    counter: COUNTER_QUERY,
  },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  name = 'Nico';

  greetings = '';

  step = 1;

  counter = 0;

  async increment() {
    const { data, errors } = await this.$apollo.mutate<
      IncrementMutation,
      IncrementMutationVariables
    >({
      mutation: INCREMENT_MUTATION,
      variables: {
        step: this.step,
      },
    });

    if (errors) {
      console.log('XXXX', errors);
      return;
    }

    if (data) {
      this.counter = data.increment;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
