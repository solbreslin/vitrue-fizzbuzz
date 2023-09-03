<script lang="ts" setup>
import { store } from '@/stores/store.ts';
import { ref, watch } from 'vue';
import { randomNumberBetweenTwoNumbers } from '@/utils/array.ts';
import { resetTheme, setRandomTheme } from '@/utils/theme.ts';

const textRotation = ref(0);

watch(
  () => store.fizzBuzz,
  async (isFizzBuzz) => {
    if (isFizzBuzz) {
      setRandomTheme();
      textRotation.value = randomNumberBetweenTwoNumbers(-40, 40);
    } else {
      resetTheme();
      textRotation.value = 0;
    }
  }
);
</script>

<template>
  <div role="region" aria-live="polite" :aria-busy="store.busy">
    <span aria-hidden="true" :class="{ loading: store.busy }"></span>

    <h1 v-if="!store.busy" :style="{ transform: `rotate(${textRotation}deg)` }">
      {{ store.output }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
div {
  align-items: center;
  display: grid;
  grid-row: 2;
  justify-items: center;
  place-content: center;
}

span {
  --scale: 1;
  aspect-ratio: 1/1;
  background: var(--theme-color-2);
  border-radius: 999px;
  grid-column: 1;
  grid-row: 1;
  height: 50vmin;
  pointer-events: none;
  transform: scale(var(--scale));
  transition:
    background-color var(--transition-duration) var(--transition-ease),
    transform var(--transition-duration) var(--transition-ease);

  &.loading {
    --scale: 0.5;
  }
}

h1 {
  color: white;
  font-size: clamp(2rem, 20vw, 12rem);
  grid-column: 1;
  grid-row: 1;
  position: relative;
  mix-blend-mode: difference;
  overflow: hidden;
  transform: rotate(var(--output-rotation));
  transition: transform var(--transition-duration) var(--transition-ease);
  word-break: break-word;
}

p {
  color: white;
  font-size: clamp(2rem, 20vw, 12rem);
  position: relative;
}
</style>
