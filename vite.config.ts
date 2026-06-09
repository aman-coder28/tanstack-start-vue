import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/vue-start/plugin/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { nitro } from "nitro/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    nitro({
      preset: "vercel",
    }),
    tanstackStart({
      server: {
        build: {
          inlineCss: true,
        },
      },
    }),
    vue(),
    vueJsx(),
    Icons({
      compiler: "vue3",
      jsx: "preact",
    }),
  ],
});
