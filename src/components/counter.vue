<script lang="ts" setup>
import { ref } from 'vue';

const count = ref(1);
</script>

<template>
  <section>
    <button @click="count++">{{ count }}++</button>
  </section>
</template>
