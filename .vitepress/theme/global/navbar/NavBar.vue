<script lang="ts" setup>
import { useWindowScroll } from "@vueuse/core";
import { useLayout } from "../../composables/layout";
import NavBarAppearance from "./NavBarAppearance.vue";
import NavBarExtra from "./NavBarExtra.vue";
import NavBarHamburger from "./NavBarHamburger.vue";
import NavBarMenu from "./NavBarMenu.vue";
import NavBarSearch from "./NavBarSearch.vue";
import NavBarSocialLinks from "./NavBarSocialLinks.vue";
import NavBarTitle from "./NavBarTitle.vue";
import NavBarTranslations from "./NavBarTranslations.vue";

const props = defineProps<{
  isScreenOpen: boolean;
}>();

defineEmits<{
  (e: "toggle-screen"): void;
}>();

const { y } = useWindowScroll();
const { isHome, hasSidebar } = useLayout();
</script>

<template>
  <div
    class="NavBar"
    :class="{
      'has-sidebar': hasSidebar,
      home: isHome,
      top: y === 0
    }"
  >
    <div class="navigation">
      <NavBarTitle>
        <template #nav-bar-title-before>
          <slot name="nav-bar-title-before" />
        </template>
        <template #nav-bar-title-after>
          <slot name="nav-bar-title-after" />
        </template>
      </NavBarTitle>

      <NavBarMenu class="menu" />
    </div>

    <div class="spacer" />
    <NavBarSearch class="search" />
    <NavBarTranslations class="translations" />
    <NavBarAppearance class="appearance" />
    <NavBarSocialLinks class="social-links" />
    <NavBarExtra class="extra" />
    <NavBarHamburger class="hamburger" :active="isScreenOpen" @click="$emit('toggle-screen')" />
  </div>
</template>

<style scoped>
.NavBar {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: row;
  padding-block: 8px;
  position: relative;
  pointer-events: none;
  white-space: nowrap;
  transition:
    background-color 0.25s,
    border-color 0.25s !important;
}

.NavBar.screen-open {
  transition: none !important;
  background-color: var(--vp-nav-bg-color);
}

.NavBar:not(.home) {
  background-color: var(--vp-nav-bg-color);
}

.NavBar :deep(*) {
  pointer-events: auto;
}

@media (min-width: 960px) {
  .NavBar:not(.home) {
    background-color: transparent;
  }

  .NavBar:not(.has-sidebar):not(.home.top) {
    background-color: var(--vp-nav-bg-color);
  }
}

.navigation {
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 36px;
}

.spacer {
  flex: 1;
  justify-self: stretch;
  align-self: stretch;
}

.menu + .translations::before,
.menu + .appearance::before,
.menu + .social-links::before,
.translations + .appearance::before,
.appearance + .social-links::before {
  margin-right: 8px;
  margin-left: 8px;
  width: 1px;
  height: 24px;
  background-color: var(--vp-c-divider);
  transition: background-color 0.25s !important;
  content: "";
}

.menu + .appearance::before,
.translations + .appearance::before {
  margin-right: 16px;
}

.social-links {
  margin-right: -8px;
}
</style>
