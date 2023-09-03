// This file resolves a Webstorm/TypeScript error where Vue components were not resolved.
// https://github.com/vuejs/vue-cli/issues/1198#issuecomment-1139752067

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
