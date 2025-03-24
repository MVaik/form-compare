// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import angular from "@analogjs/astro-angular";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), angular()],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@tanstack/**"],
    },
  },
});
