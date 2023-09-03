import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import FizzBuzzOutput from '@/components/FizzBuzz/FizzBuzzOutput.vue';
import { store } from '@/stores/store.ts';
import { Message } from '@/utils/fizzBuzz.ts';

describe('FizzBuzzOutput.vue', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = shallowMount(FizzBuzzOutput);
  });

  afterEach(() => {
    store.reset();
  });

  it('displays the initial state correctly', () => {
    expect(wrapper.find('h1').text()).toBe('');
  });

  it('updates the aria loading state correctly', async () => {
    store.setBusy(true);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[aria-busy="true"]').isVisible()).toBe(true);
  });

  it(`displays ${Message.FIZZBUZZ} when 'store.output' is ${Message.FIZZBUZZ}`, async () => {
    store.setOutput(Message.FIZZBUZZ);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe(Message.FIZZBUZZ);
  });

  it(`displays ${Message.FIZZ} when 'store.output' is ${Message.FIZZ}`, async () => {
    store.setOutput(Message.FIZZ);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe(Message.FIZZ);
  });

  it(`displays ${Message.BUZZ} when 'store.output' is ${Message.BUZZ}`, async () => {
    store.setOutput(Message.BUZZ);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe(Message.BUZZ);
  });

  it(`displays '1' when 'store.output' is '1'`, async () => {
    store.setOutput('1');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('1');
  });

  it(`displays nothing when 'store.output' is ''`, async () => {
    store.setOutput('');

    await wrapper.vm.$nextTick();

    expect(wrapper.find('h1').text()).toBe('');
  });
});
