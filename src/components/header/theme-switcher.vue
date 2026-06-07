<script setup lang="ts">
import IconMoon from "virtual:icons/tabler/moon";
import IconSun from "virtual:icons/tabler/sun";

function toggleTheme() {
  const theme = localStorage.getItem("theme");

  if (theme) {
    if (theme === "dark") {
      localStorage.setItem("theme", "light");

      document.documentElement.classList.replace("dark", "light");
    } else {
      localStorage.setItem("theme", "dark");

      document.documentElement.classList.replace("light", "dark");
    }
  } else {
    localStorage.setItem("theme", "light");

    document.documentElement.classList.add("light");
  }
}
</script>

<template>
  <div>
    <button
      class="z-10 mr-1.25 flex h-6.5 cursor-grab items-center gap-1.25 rounded-full border-2 border-gray-300"
      id="theme-button"
      @click="toggleTheme"
      title="Theme Toggle Button"
      type="button"
    >
      <IconSun
        class="size-5 h-full w-full rounded-xl border-gray-400 bg-gray-400 p-0.75 text-white dark:border-transparent dark:bg-transparent dark:text-gray-300"
      />
      <IconMoon
        class="size-5 h-full w-full p-0.75 dark:rounded-xl dark:border-gray-400 dark:bg-gray-400"
      />
    </button>
  </div>
</template>
