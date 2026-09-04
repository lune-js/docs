import { useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect, type ComputedRef } from "vue";
import { hasActiveLink as containsActiveLink } from "../support/sidebar";
import { isActive } from "../support/utils";

const isOpen = ref(false);

/**
 * a11y: cache the element that opened the Sidebar (the menu button) then
 * focus that button again when Menu is closed with Escape key.
 */
export function useCloseSidebarOnEscape(close: () => void) {
  let triggerElement: HTMLButtonElement | undefined;

  watchEffect(() => {
    triggerElement = isOpen.value ? (document.activeElement as HTMLButtonElement) : undefined;
  });

  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });

  function onEscape(e: KeyboardEvent) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement?.focus();
    }
  }
}

export function useSidebarControl() {
  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    if (isOpen.value) close();
    else open();
  }

  return {
    isOpen,
    open,
    close,
    toggle
  };
}

export function useSidebarItemControl(item: ComputedRef<DefaultTheme.SidebarItem>) {
  const route = useRoute();

  const collapsed = ref(false);

  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });

  const isLink = computed(() => {
    return !!item.value.link;
  });

  const isActiveLink = ref(false);
  const hasActiveLink = ref(false);

  async function updateActiveLink(): Promise<void> {
    if (item.value.link) {
      isActiveLink.value = isActive(route.data.relativePath, route.hash, item.value.link);
    } else {
      isActiveLink.value = false;
    }

    if (isActiveLink.value) {
      hasActiveLink.value = true;
      await nextTick(() => (collapsed.value = false));
      return;
    }
    if (!item.value.items) {
      hasActiveLink.value = false;
      return;
    }
    hasActiveLink.value = containsActiveLink(route.data.relativePath, route.hash, item.value.items);
    if (hasActiveLink.value) {
      await nextTick(() => (collapsed.value = false));
    }
  }

  watch([item, route], updateActiveLink);
  onMounted(updateActiveLink);

  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });

  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });

  function toggle(): void {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }

  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink: isActiveLink as ComputedRef<boolean>,
    hasActiveLink: hasActiveLink as ComputedRef<boolean>,
    hasChildren,
    toggle
  };
}
