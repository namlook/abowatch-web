// declare module '*.vue' {
//   import Vue from 'vue';

//   export default Vue;
// }

declare module '*.vue' {
  import { defineComponent } from '@vue/composition-api';

  const component: ReturnType<typeof defineComponent>;
  export default component;
}

declare module '*.graphql'
