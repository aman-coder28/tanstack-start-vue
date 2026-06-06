<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { Outlet } from "@tanstack/vue-router";
import { ServerSessionQueryOptions } from "@/lib/db/query.functions";

const { data, suspense } = useQuery(() => ServerSessionQueryOptions());

await suspense();
</script>

<template>
  <main class="mb-6" id="content">
    <section v-if="data?.user?.name">
      <Outlet />
    </section>

    <h1 v-else>Not Logged In</h1>
  </main>
</template>
