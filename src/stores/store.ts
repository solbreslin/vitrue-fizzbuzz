import { reactive, watch } from 'vue';
import { Message } from '@/utils/fizzBuzz.ts';

export const store = reactive({
  busy: false,
  fizzBuzz: false,
  output: '',
  setBusy(newValue: boolean) {
    this.busy = newValue;
  },
  setOutput(newValue: string) {
    this.output = newValue;
  },
  setFizzBuzz(newValue: boolean) {
    this.fizzBuzz = newValue;
  },
  reset() {
    this.busy = false;
    this.output = '';
  },
});

watch(
  () => store.output,
  (output) => {
    store.setFizzBuzz(
      output === Message.FIZZ ||
        output === Message.BUZZ ||
        output === Message.FIZZBUZZ
    );
  },
  { deep: true }
);
