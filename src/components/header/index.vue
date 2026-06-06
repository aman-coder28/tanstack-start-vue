<script lang="ts" setup>
import { Link, useLocation } from "@tanstack/vue-router";
import IconCirclePlusFilled from "virtual:icons/tabler/circle-plus-filled";
import IconSearch from "virtual:icons/tabler/search";
import Button from "@/components/ui/button/Button.vue";
import type { User } from "@/lib/auth";
import { signInWithGithub, signOut } from "@/lib/auth/client";

const props = defineProps<{ user?: User }>();
const location = useLocation();
</script>

<template>
  <header>
    <nav class="mt-8 mb-6 flex w-full items-center justify-between gap-4">
      <div>
        <Link class="text-xl font-bold tracking-wide" to="/"> Tudos </Link>
      </div>

      <section>
        <div v-if="user?.email" class="inline-flex items-center justify-center gap-4">
          <button v-if="location.pathname === '/'" type="button">
            <IconSearch
              strokeWidth="1.8"
              class="size-6"
              :style="{ 'view-transition-name': 'search-button' }"
            />
          </button>

          <Link v-if="location.pathname === '/'" to="/create">
            <IconCirclePlusFilled strokeWidth="1.8" class="size-6.5" />
          </Link>

          <button @click="() => null" title="User Avatar" type="button">
            <img
              :alt="user?.name ?? ''"
              class="size-6 rounded-full bg-white"
              height="24px"
              loading="eager"
              :src="user?.image ?? ''"
              width="24px"
            />
          </button>

          <!-- <Transition name="slide-fade">
             <UserInfoDropDown email={props.user?.email ?? "" } image={props.user?.image ?? "" } name={props.user?.name
              ?? "" } />
          </Transition> -->
        </div>

        <section v-if="!user?.email">
          <Button @click="signInWithGithub" type="button"> Login </Button>
        </section>
      </section>
    </nav>
  </header>
</template>
