<script setup lang="ts">
import Layout from "@/components/Layout.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <Layout />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
