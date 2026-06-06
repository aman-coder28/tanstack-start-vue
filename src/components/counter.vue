<script lang="ts" setup>
import { ref } from "vue";
import Button from "./ui/button/Button.vue";

const count = ref(1);
</script>

<template>
  <section>
    <Button size="lg" @click="count++">{{ count }} ++</Button>
  </section>
</template>
