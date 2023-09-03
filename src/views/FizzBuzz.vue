<script setup lang="ts">
import FizzBuzzInput from '@/components/FizzBuzz/FizzBuzzInput.vue';
import FizzBuzzOutput from '@/components/FizzBuzz/FizzBuzzOutput.vue';
</script>

<template>
  <section>
    <FizzBuzzOutput />
    <FizzBuzzInput />
  </section>
</template>

<style scoped lang="scss">
section {
  align-items: center;
  display: grid;
  grid-row-gap: 1.5rem;
  grid-template-rows: 1fr auto 1fr;
  height: 100%;
}
</style>
