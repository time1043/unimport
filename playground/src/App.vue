<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function inc() {
  count.value++;
}
</script>

<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="inc">Increment</button>
  </div>
</template>

<style scoped></style>
