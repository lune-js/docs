<script lang="ts" setup>
import { useScrollLock } from "@vueuse/core";
import { inBrowser } from "vitepress";
import { ref, watch } from "vue";
import { useLayout } from "../../composables/layout";
import AsideGroup from "./AsideGroup.vue";

const { sidebarGroups, hasSidebar } = useLayout();

const props = defineProps<{
  open: boolean;
}>();

// a11y: focus Nav element when menu has opened
const navEl = ref<HTMLElement | null>(null);
const isLocked = useScrollLock(inBrowser ? document.body : null);

watch(
  [props, navEl],
  () => {
    if (props.open) {
      isLocked.value = true;
      navEl.value?.focus();
    } else isLocked.value = false;
  },
  { immediate: true, flush: "post" }
);

const key = ref(0);

watch(
  sidebarGroups,
  () => {
    key.value += 1;
  },
  { deep: true }
);
</script>

<template>
  <aside v-if="hasSidebar" class="Aside" :class="{ open }" ref="navEl" @click.stop aria-label="primary-aside">
    <nav class="nav" id="AsideNav" aria-labelledby="sidebar-aria-label" tabindex="-1">
      <span class="visually-hidden" id="sidebar-aria-label">Sidebar Navigation</span>

      <slot name="sidebar-nav-before" />
      <AsideGroup :items="sidebarGroups" :key />
      <slot name="sidebar-nav-after" />
    </nav>
  </aside>
</template>

<style scoped>
.Aside {
  position: fixed;
  border-right: 1px solid var(--vp-c-divider);
  padding-block: var(--vp-aside-py);
  padding-inline: 32px;
  height: 100dvh;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  width: var(--vp-aside-width);
  z-index: var(--vp-z-index-sidebar);
  transform: translateX(-100%);
  top: 0;
  left: 0;
  opacity: 0;
  box-shadow: var(--vp-c-shadow-3);
  transition:
    opacity 0.25s,
    transform 0.25s ease;
  overscroll-behavior: contain;
}

.Aside.open {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  background-color: var(--vp-c-bg);
  transition:
    background-color 0.25s,
    opacity 0.25s,
    transform 0.25s cubic-bezier(0.19, 1, 0.22, 1);
}

.dark .Aside {
  box-shadow: var(--vp-shadow-1);
}

@media (min-width: 960px) {
  .Aside {
    flex-shrink: 0;
    position: sticky;
    padding-inline-start: 0;
    padding-inline-end: var(--vp-aside-px);
    transform: translateX(0);
    height: calc(100dvh - var(--vp-nav-height));
    top: var(--vp-nav-height);
    opacity: 1;
    visibility: visible;
    box-shadow: none;

    /* Done for padding in .item (AsideItem.vue) */
    margin-left: -12px;
  }
}

.nav {
  outline: 0;
}
</style>
