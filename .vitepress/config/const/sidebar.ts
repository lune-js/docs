// ! Order is important and used in `.vitepress/theme/composables/prev-next.ts`
import type { DefaultTheme } from "vitepress";

const guideMenus: DefaultTheme.SidebarItem[] = [
  {
    base: "/guide/",
    text: "Getting Started",
    items: [
      { text: "Introduction", link: "/" },
      { text: "Installation", link: "/installation" }
    ]
  },
  {
    base: "/guide/",
    text: "Essentials",
    items: [
      { text: "Overview", link: "overview" },
      { text: "createApp", link: "create-app" },
      { text: "Scope and Context", link: "scope-context" },
      { text: "Reactivity", link: "reactivity" },
      { text: "Properties", link: "properties" }
    ]
  }
];

const directivesMenu: DefaultTheme.SidebarItem = {
  base: "/directives/",
  text: "Directives",
  items: [
    { text: "Overview", link: "/" },
    { text: "lu-scope", link: "lu-scope" },
    { text: "lu-bind", link: "lu-bind" },
    { text: "lu-model", link: "lu-model" },
    { text: "lu-if", link: "lu-if" },
    { text: "lu-for", link: "lu-for" },
    { text: "lu-show", link: "lu-show" },
    { text: "lu-on", link: "lu-on" },
    { text: "lu-effect", link: "lu-effect" },
    { text: "lu-html", link: "lu-html" },
    { text: "lu-text", link: "lu-text" },
    { text: "lu-cloak", link: "lu-cloak" },
    { text: "lu-pre", link: "lu-pre" },
    { text: "lu-once", link: "lu-once" },
    { text: "ref", link: "ref" }
  ]
};

const integrationsMenu: DefaultTheme.SidebarItem = {
  base: "/integrations/",
  text: "Integrations",
  items: [
    { text: "Overview", link: "/" },
    { text: "Astro", link: "astro" },
    { text: "Django", link: "django" },
    { text: "Rails", link: "rails" },
    { text: "Laravel", link: "laravel" },
    { text: "ASP.NET Core", link: "aspnet" }
  ]
};

const advancedMenu: DefaultTheme.SidebarItem = {
  base: "/advanced/",
  text: "Advanced",
  items: [
    { text: "Overview", link: "/" },
    { text: "State Management", link: "state-management" },
    { text: "Form Handling", link: "form-handling" },
    { text: "Custom Directives", link: "custom-directives" },
    { text: "Plugins", link: "plugins" },
    { text: "Global State", link: "global-state" },
    { text: "Custom Delimiters", link: "custom-delimiters" },
    { text: "Security", link: "security" }
  ]
};

const menus: DefaultTheme.SidebarItem[] = [...guideMenus, directivesMenu, integrationsMenu, advancedMenu];

export const sidebar: DefaultTheme.SidebarMulti = {
  "/guide/": menus,
  "/directives/": menus,
  "/integrations/": menus,
  "/advanced/": menus
};
