import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import highlight from "./src/plugins/highlight";

export default defineConfig({
  plugins: [vue(), await highlight()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
