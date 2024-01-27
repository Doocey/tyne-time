import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tynetime.com",
  integrations: [],
  compressHTML: true,
  build: {
    assets: "_assets"
  }
});
