import { inBrowser, onContentUpdated, useRoute } from "vitepress";
import type { DefaultTheme, useLayout as expected } from "vitepress/theme";
import {
  computed,
  shallowReadonly,
  shallowRef,
  watch,
  type ComputedRef,
  type InjectionKey,
  type ShallowRef
} from "vue";
import { getSidebar, getSidebarGroups } from "../support/sidebar";
import { isActive } from "../support/utils";
import type { NavItemWithLinkAndSubNav } from "../types";
import { useData } from "./data";
import { getHeaders } from "./outline";
import { useCloseSidebarOnEscape } from "./sidebar";

const headers = shallowRef<DefaultTheme.OutlineItem[]>([]);
const sidebar = shallowRef<DefaultTheme.SidebarItem[]>([]);
const subnav = shallowRef<NavItemWithLinkAndSubNav[]>([]);

const is960 = shallowRef(false);

type Expected = Omit<ReturnType<typeof expected>, "leftAside">;

interface UseLayout extends Expected {
  hasNavbar: ComputedRef<boolean>;
  hasSubnav: ComputedRef<boolean>;
  subnav: Readonly<ShallowRef<NavItemWithLinkAndSubNav[]>>;
}

export function useLayout(): UseLayout {
  const { frontmatter, theme } = useData();

  const isHome = computed(() => {
    return !!(frontmatter.value.isHome ?? frontmatter.value.layout === "home");
  });

  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && !isHome.value;
  });

  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);

  const sidebarGroups = computed(() => (hasSidebar.value ? getSidebarGroups(sidebar.value) : []));

  const hasAside = computed(() => {
    if (isHome.value) return false;
    if (frontmatter.value.aside != null) return !!frontmatter.value.aside;
    return theme.value.aside !== false && hasLocalNav.value;
  });

  const hasNavbar = computed(() => frontmatter.value.navbar !== false);

  const hasLocalNav = computed(() => headers.value.length > 0);

  const hasSubnav = computed(() => subnav.value.length > 0);

  return {
    hasAside,
    hasLocalNav,
    hasNavbar,
    hasSidebar,
    hasSubnav,
    headers: shallowReadonly(headers),
    isHome,
    isSidebarEnabled,
    sidebar: shallowReadonly(sidebar),
    sidebarGroups,
    subnav: shallowReadonly(subnav)
  };
}

interface RegisterWatchersOptions {
  closeSidebar: () => void;
}

export function registerWatchers({ closeSidebar }: RegisterWatchersOptions) {
  const { frontmatter, page, theme } = useData();

  watch(
    () => [page.value.relativePath, theme.value.sidebar] as const,
    ([relativePath, sidebarConfig]) => {
      const newSidebar = sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
      if (JSON.stringify(newSidebar) !== JSON.stringify(sidebar.value)) {
        sidebar.value = newSidebar;
      }
    },
    { immediate: true, deep: true, flush: "sync" }
  );

  watch(
    () => [page.value.relativePath, theme.value.nav] as const,
    ([relativePath, nav]) => {
      subnav.value = nav.filter((item): item is NavItemWithLinkAndSubNav => {
        const toMatch = "link" in item && typeof item.link === "string" ? item.link : null;
        return toMatch && "subNav" in item ? isActive(relativePath, "", toMatch, !!toMatch) : false;
      });
    },
    { immediate: true, deep: true, flush: "sync" }
  );

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline);
  });

  if (inBrowser) {
    is960.value = window.innerWidth >= 960;
    window.addEventListener(
      "resize",
      () => {
        is960.value = window.innerWidth >= 960;
      },
      { passive: true }
    );
  }

  const route = useRoute();
  watch(() => route.path, closeSidebar);

  useCloseSidebarOnEscape(closeSidebar);
}

export interface LayoutInfo {
  heroImageSlotExists: ComputedRef<boolean>;
}

export const layoutInfoInjectionKey: InjectionKey<LayoutInfo> = Symbol("layout-info");
