import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { analyzer } from "vite-bundle-analyzer";
import { groupIconVitePlugin, localIconLoader } from "vitepress-plugin-group-icons";
import llmstxt from "vitepress-plugin-llms";
import type { VPConfig } from "../theme/types.ts";
import { description, domain } from "./const/index.js";

const resolveDir = (path: string) => resolve(dirname(fileURLToPath(import.meta.url)), path);

export const vite = {
  optimizeDeps: {
    include: ["mermaid", "@braintree/sanitize-url", "dayjs"]
  },
  plugins: [
    groupIconVitePlugin({
      customIcon: {
        esm: localIconLoader(import.meta.url, "../../public/assets/esm.svg"),
        jsdelivr: localIconLoader(import.meta.url, "../../public/assets/jsdelivr.svg"),
        unpkg: localIconLoader(import.meta.url, "../../public/assets/unpkg.svg")
      }
    }),

    process.env.NODE_ENV === "production"
      ? llmstxt({
          description,
          details: description,
          ignoreFiles: ["index.md"],
          domain
        })
      : undefined,

    process.env.ANALYZE === "true" ? analyzer() : undefined
  ],
  publicDir: resolveDir("../../public")
} satisfies VPConfig["vite"];
