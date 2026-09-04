import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
import { sidebar } from "./const/index.js";
import { core } from "./core.js";
import { vite } from "./vite.js";

export default withMermaid(
  defineConfig({
    ...core,
    themeConfig: {
      editLink: {
        pattern: "https://github.com/lune-js/web/edit/main/routes/:path",
        text: "Edit this page on GitHub"
      },

      footer: {
        message: "Published under MIT License.",
        copyright: `© ${new Date().getFullYear()} Lune.js contributors.`
      },

      logo: {
        alt: "Lune.js",
        src: "/text.svg"
      },

      nav: [
        { text: "Guide", link: "/guide/", activeMatch: "/guide/" },
        { text: "Directives", link: "/directives/", activeMatch: "/directives/" },
        { text: "Integrations", link: "/integrations/", activeMatch: "/integrations/" },
        { text: "Advanced", link: "/advanced/", activeMatch: "/advanced/" }
      ],

      outline: "deep",

      search: {
        provider: "local",
        options: {
          detailedView: true
        }
      },

      sidebar,

      socialLinks: [{ icon: "github", link: "https://github.com/lune-js/lune" }]
    },
    vite
  })
);
