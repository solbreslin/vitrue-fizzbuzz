import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FizzBuzzInput from '@/components/FizzBuzz/FizzBuzzInput.vue';
import { store } from '@/stores/store.ts';
import { Message } from '@/utils/fizzBuzz.ts';

const INPUT_ID = '#fizzbuzz-input';
const ARTIFICIAL_UI_DELAY = 500;

vi.useFakeTimers();

describe('FizzBuzzInput.vue', () => {
  let wrapper: VueWrapper;
  let input: DOMWrapper<HTMLInputElement>;

  beforeEach(() => {
    store.reset();
    wrapper = shallowMount(FizzBuzzInput);
    input = wrapper.find(INPUT_ID);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.clearAllTimers();
  });

  it('renders an input field', () => {
    expect(wrapper.find(INPUT_ID).exists()).toBe(true);
  });

  it('initializes with an empty input', () => {
    expect(input.element.value).toBe('');
  });

  it(`sets aria-invalid to true when the input is invalid`, async () => {
    await input.setValue();

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[aria-invalid="true"]').exists()).toBe(true);
  });

  it('debounces user input', async () => {
    await input.setValue(3);

    expect(store.busy).toBe(true);
    expect(store.output).toBe('');

    vi.advanceTimersByTime(499);

    expect(store.busy).toBe(true);
    expect(store.output).toBe('');

    vi.advanceTimersByTime(1);

    expect(store.busy).toBe(false);
    expect(store.output).toBe(Message.FIZZ);
  });

  it('cancels the debounced function if input is invalid', async () => {
    await input.setValue(3);

    vi.advanceTimersByTime(200);

    await input.setValue('not a number');

    vi.advanceTimersByTime(300);

    expect(store.busy).toBe(false);
    expect(store.output).toBe('');
  });

  it(`sets 'output' in the store to ${Message.FIZZBUZZ} if the input is divisible by 15`, async () => {
    await input.setValue(15);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(store.output).toBe(Message.FIZZBUZZ);
  });

  it(`sets 'output' in the store to ${Message.FIZZ} if the input is divisible by 3`, async () => {
    await input.setValue(3);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(store.output).toBe(Message.FIZZ);
  });

  it(`sets 'output' in the store to ${Message.BUZZ} if the input is divisible by 5`, async () => {
    await input.setValue(5);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(store.output).toBe(Message.BUZZ);
  });

  it(`resets the store if the input is not a number`, async () => {
    await input.setValue(undefined);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(store.output).toBe('');
  });

  it(`updates 'busy' in the store correctly`, async () => {
    await input.setValue(5);

    expect(store.busy).toBe(true);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(store.busy).toBe(false);
  });

  it(`calls 'setBusy' spy function twice`, async () => {
    const setBusySpy = vi.spyOn(store, 'setBusy');
    await input.setValue(5);

    vi.advanceTimersByTime(ARTIFICIAL_UI_DELAY);

    expect(setBusySpy).toHaveBeenCalledTimes(2);
  });
});
