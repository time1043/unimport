<script setup lang="ts">
const count = ref(0);

function inc() {
  count.value++;
}

const double = useDoubled(count);
</script>

<template>
  <div>
    <h1>{{ count }} x 2 = {{ double }}</h1>
    <button @click="inc">Increment</button>
  </div>
</template>

<style scoped></style>
