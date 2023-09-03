import { reactive } from 'vue';

export const store = reactive({
  busy: false,
  output: '',
  setBusy(newValue: boolean) {
    this.busy = newValue;
  },
  setOutput(newValue: string) {
    this.output = newValue;
  },
  reset() {
    this.busy = false;
    this.output = '';
  },
});
