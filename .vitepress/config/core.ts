import { defineConfig } from "vitepress";
import type { HeadConfig } from "vitepress";
import { groupIconMdPlugin } from "vitepress-plugin-group-icons";
import { description, domain, moonlightII } from "./const/index.js";

const ogImg = `${domain}/og-image-large.jpg`;

const head: HeadConfig[] = [
  ["meta", { property: "og:image", content: ogImg }],
  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "twitter:domain", content: "lune-js.com" }],
  ["meta", { property: "twitter:image", content: ogImg }],
  ["meta", { property: "twitter:card", content: "summary_large_image" }],
  ["link", { rel: "icon", type: "image/svg+xml", href: "/favicons/favicon.svg" }],
  ["link", { rel: "alternate icon", href: "/favicons/favicon.ico" }],
  ["meta", { name: "apple-mobile-web-app-title", content: "Lune.js" }],
  ["link", { rel: "manifest", href: "/pwa/manifest.webmanifest" }]
];

export const core = defineConfig({
  title: "Lune.js",
  description,
  appearance: "force-dark",
  base: "/",
  cleanUrls: true,
  head,
  ignoreDeadLinks: true,
  lastUpdated: false,
  outDir: "build",
  srcDir: "routes",
  srcExclude: [],
  transformHead(context) {
    const relativePath = context.pageData.relativePath;
    const head: Array<[string, Record<string, string>]> = [];
    if (relativePath === "index.md") {
      head.push([
        "link",
        {
          rel: "alternate",
          type: "text/plain",
          title: "LLM docs",
          href: `${domain}/llms.txt`
        }
      ]);
    }
    if (
      relativePath.startsWith("advanced/") ||
      relativePath.startsWith("directives/") ||
      relativePath.startsWith("guide/") ||
      relativePath.startsWith("integrations/")
    ) {
      head.push([
        "link",
        {
          rel: "alternate",
          type: "text/markdown",
          title: "Markdown source",
          href: `https://raw.githubusercontent.com/lune-js/docs/refs/heads/main/routes/${relativePath}`
        }
      ]);
    }
    return head;
  },
  transformPageData(pageData) {
    pageData.frontmatter.head ??= [];

    if (pageData.frontmatter.canonical) {
      pageData.frontmatter.head.push([
        "link",
        {
          rel: "canonical",
          href: pageData.frontmatter.canonical
        }
      ]);
    }

    // Add page-specific Open Graph and Twitter meta tags
    const title = pageData.frontmatter.title || pageData.title;
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      "Simple, declarative, and functional library for building reactive user interfaces.";

    // Construct the canonical URL for the page
    let url = domain;
    if (pageData.relativePath !== "index.md") {
      const path = pageData.relativePath.replace(/\.md$/, ".html").replace(/\/index\.html$/, "/");
      if (path !== "index.html") {
        url += "/" + path.replace(/^\/+/, "");
      }
    }

    if (title) {
      pageData.frontmatter.head.push(["meta", { property: "og:title", content: title }]);
      pageData.frontmatter.head.push(["meta", { name: "twitter:title", content: title }]);
    }

    if (description) {
      pageData.frontmatter.head.push(["meta", { property: "og:description", content: description }]);
      pageData.frontmatter.head.push(["meta", { name: "twitter:description", content: description }]);
    }

    pageData.frontmatter.head.push(["meta", { property: "og:url", content: url }]);
  },
  titleTemplate: ":title | Lune.js",
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
    theme: moonlightII
  }
});
