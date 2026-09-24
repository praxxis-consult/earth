import { defineConfig } from "vitest/config";

// Separate from vite.config.ts so the TanStack Start/nitro plugins stay out of unit tests.
export default defineConfig({
  resolve: { alias: { "@": `${process.cwd()}/src` } },
  test: { include: ["src/**/*.test.ts"], environment: "node" },
});
