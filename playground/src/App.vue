<script setup lang="ts">
const count = ref(0);

function inc() {
  count.value++;
}

const double = useDoubled(count);
const a = multiplier;
// const a = 2;
</script>

<template>
  <div>
    <h1>{{ count }} x {{ a }} = {{ double }}</h1>
    <button @click="inc">Increment</button>
  </div>
</template>

<style scoped></style>
