// @ts-ignore
import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  preview: {
    buckets: {
      jaydeep: { access: "private" },
    },
  },
});
