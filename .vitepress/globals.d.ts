/// <reference types="vite/client" />

declare const __VP_HASH_MAP__: Record<string, string>;
declare const __VP_LOCAL_SEARCH__: boolean;
declare const __ALGOLIA__: boolean;
declare const __ASSETS_DIR__: string;
declare const __CARBON__: boolean;

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "@localSearchIndex" {
  const data: Record<string, () => Promise<{ default: string }>>;
  export default data;
}

declare module "mark.js/src/vanilla.js" {
  import type Mark from "mark.js";
  const mark: typeof Mark;
  export default mark;
}
