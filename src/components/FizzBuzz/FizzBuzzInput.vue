<script lang="ts"></script>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import { debounce } from 'lodash';
import { PhWarningCircle } from '@phosphor-icons/vue';

import { store } from '@/stores/store.ts';
import { fizzBuzz } from '@/utils/fizzBuzz.ts';

// Adding a delay to make it appear the system is busy, for better UX
const ARTIFICIAL_UI_DELAY = 500;

const inputEl = ref<HTMLInputElement>();
const userInput = ref<number | string>('');

// In Chrome and FF, the value of an empty input OR an input with invalid characters is an empty string.
// Check if the user has interacted with the input before adding visual error validation.
const userHasInteracted = ref(false);

const validateUserInput = (userInput: string | number): userInput is number => {
  return typeof userInput === 'number';
};

const debouncedFizzBuzz = debounce((value: number) => {
  const output = fizzBuzz(value);

  store.setOutput(output);
  store.setBusy(false);
}, ARTIFICIAL_UI_DELAY);

watch(userInput, async (value) => {
  if (!userHasInteracted.value) {
    userHasInteracted.value = true;
  }

  if (validateUserInput(value)) {
    store.setBusy(true);
    debouncedFizzBuzz(value);
  } else {
    store.reset();
    debouncedFizzBuzz.cancel();
  }
});

onMounted(() => {
  inputEl.value?.focus();
});

onBeforeUnmount(() => {
  debouncedFizzBuzz.cancel();
});
</script>

<template>
  <fieldset>
    <input
      ref="inputEl"
      id="fizzbuzz-input"
      type="number"
      v-model="userInput"
      min="1"
      max="1000000"
      :aria-invalid="!userInput"
    />
    <label for="fizzbuzz-input">
      <span>
        <PhWarningCircle
          :size="21"
          color="var(--color-red)"
          :class="{ visible: !userInput && userHasInteracted }"
          aria-hidden="true"
          weight="bold"
        />Enter a number</span
      ></label
    >
  </fieldset>
</template>

<style lang="scss" scoped>
fieldset {
  align-self: end;
  border: none;
  display: grid;
  grid-row: 3;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  position: relative;
}

input {
  background: hsla(0, 100%, 100%, 0.3);
  border: 3px solid hsla(0, 0%, 0%, 0%);
  border-radius: 4px;
  font: inherit;
  font-size: 2rem;
  font-weight: 500;
  padding: 0.5rem;
  text-align: center;
  transition: border-color var(--transition-duration) var(--transition-ease);
  -moz-appearance: textfield;

  &:focus-visible {
    border-color: hsla(0, 0%, 100%, 0.25);
    outline: none;
  }

  @supports not selector(:focus-visible) {
    &:focus {
      outline: 1px dashed var(--color-red);
    }
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

label {
  justify-content: center;
  display: flex;
  gap: 0.25rem;
  grid-template-columns: auto auto;
  transition: opacity var(--transition-duration) var(--transition-ease);

  span {
    position: relative;
  }

  svg {
    --transition-delay: 0;
    opacity: 0;
    position: absolute;
    right: calc(100% + 0.5rem);
    transition: opacity var(--transition-duration) var(--transition-ease)
      var(--transition-delay);

    &.visible {
      --transition-delay: 0.25s;
      opacity: 1;
    }
  }
}
</style>
