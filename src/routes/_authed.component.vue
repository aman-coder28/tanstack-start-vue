<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { Outlet } from "@tanstack/vue-router";
import NavBar from "@/components/header/index.vue";
import { ServerSessionQueryOptions } from "../lib/db/query.functions";

const { data } = useQuery(() => ServerSessionQueryOptions());
</script>

<template>
  <div class="mx-6">
    <NavBar :user="data?.user" />

    <main v-if="data?.user?.name" class="mb-6" id="content">
      <Outlet />
    </main>

    <h1 v-else>Not Logged In</h1>
  </div>
</template>
