<script lang="ts" setup>
import { computed } from "vue";
import { useData } from "../../composables/data";
import { useLayout } from "../../composables/layout";
import MobileMenuDropdown from "./MobileMenuDropdown.vue";

defineProps<{
  open: boolean;
}>();

defineEmits<{
  (e: "open-menu"): void;
}>();

const { theme } = useData();
const { hasSidebar, headers, hasLocalNav } = useLayout();

const classes = computed(() => {
  return {
    MobileMenu: true,
    "has-sidebar": hasSidebar.value,
    empty: !hasLocalNav.value,
    fixed: !hasLocalNav.value && !hasSidebar.value
  };
});
</script>

<template>
  <div :class="classes">
    <div class="vp-container">
      <button
        v-if="hasSidebar"
        class="mobile-menu"
        :aria-expanded="open"
        aria-controls="SidebarNav"
        @click="$emit('open-menu')"
      >
        <span class="vpi-align-left mobile-menu-icon"></span>
        <span class="mobile-menu-text">
          {{ theme.sidebarMenuLabel || "Menu" }}
        </span>
      </button>

      <MobileMenuDropdown :headers />
    </div>
  </div>
</template>

<style scoped>
.MobileMenu {
  position: sticky;
  top: 0;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-local-nav);
  border-bottom: 1px solid var(--vp-c-gutter);
  width: 100%;
  background-color: var(--vp-local-nav-bg-color);
}

.MobileMenu.fixed {
  position: fixed;
}

@media (min-width: 960px) {
  .MobileMenu {
    top: var(--vp-nav-height);
  }

  .MobileMenu.has-sidebar {
    padding-left: var(--vp-aside-width);
  }

  .MobileMenu.empty {
    display: none;
  }
}

@media (min-width: 1280px) {
  .MobileMenu {
    display: none;
  }
}

.vp-container {
  justify-content: space-between;
  padding-block: 12px;
}

.mobile-menu {
  display: flex;
  align-items: center;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.mobile-menu:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

@media (min-width: 960px) {
  .mobile-menu {
    display: none;
  }
}

.mobile-menu-icon {
  margin-right: 8px;
  font-size: 14px;
}
</style>
