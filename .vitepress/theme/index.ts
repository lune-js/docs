import "virtual:group-icons.css";
import "./index.css";
import type { Theme } from "vitepress";
import VPBadge from "./components/VPBadge.vue";
import Link from "./global/Link.vue";
import Layout from "./Layout.vue";

export default {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", VPBadge);
    app.component("Link", Link);
  }
} satisfies Theme;
