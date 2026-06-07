<script setup lang="ts">
import IconLogout from "virtual:icons/tabler/logout";
import IconSettingsFilled from "virtual:icons/tabler/settings-filled";
import IconUserFilled from "virtual:icons/tabler/user-filled";
import { signOut } from "@/lib/auth/client";
import ThemeSwitcher from "./theme-switcher.vue";

defineProps<{ name: string; email: string }>();
</script>

<template>
  <div
    class="dark:border-bleck dark:bg-dark absolute top-11 right-5 z-9999 mt-6 w-60 rounded-lg border border-gray-400 bg-gray-100 shadow"
  >
    <div class="p-2">
      <div class="dark:bg-bleck flex items-center space-x-1.5 rounded-lg p-2 px-2.5 text-sm">
        <div class="text-sm">
          <div class="text-heading font-medium">{{ name }}</div>
          <div class="text-body truncate">{{ email }}</div>
        </div>
      </div>
    </div>
    <ul aria-labelledby="dropdownAvatarButton" class="text-body px-2 pb-2 text-sm font-medium">
      <li>
        <span
          class="hover:bg-neutral-tertiary-medium hover:text-heading inline-flex w-full items-center justify-between rounded p-2"
        >
          <p>Account</p>

          <IconUserFilled class="me-1.5 size-4.5" />
        </span>
      </li>
      <li>
        <span
          class="hover:bg-neutral-tertiary-medium hover:text-heading inline-flex w-full items-center justify-between rounded p-2"
        >
          <p>Settings</p>

          <IconSettingsFilled class="me-1.5 size-4.5" />
        </span>
      </li>
      <li
        class="hover:bg-neutral-tertiary-medium hover:text-heading mb-1.5 flex w-full items-center justify-between rounded p-2"
      >
        <p class="inline-flex items-center">Theme</p>

        <ThemeSwitcher />
      </li>

      <li class="border-secondary border-t pt-1">
        <button
          class="text-fg-danger hover:bg-neutral-tertiary-medium inline-flex w-full items-center justify-between rounded p-2"
          @click="signOut"
          type="button"
        >
          <p>Sign out</p>
          <IconLogout class="me-1 size-4.5" />
        </button>
      </li>
    </ul>
  </div>
</template>
