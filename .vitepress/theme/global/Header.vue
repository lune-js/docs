<script setup lang="ts">
import { useElementSize, useStyleTag } from "@vueuse/core";
import { provide, useTemplateRef, watchEffect } from "vue";
import { useLayout } from "../composables/layout";
import { navInjectionKey, useNav } from "../composables/nav";
import { NavBar } from "./navbar";
import { NavScreen } from "./navscreen";
import { SubNav } from "./subnav";

const header = useTemplateRef("header");
const { height: headerHeight } = useElementSize(header);
watchEffect(() => {
  if (headerHeight.value > 0) {
    useStyleTag(`:root { --vp-nav-height: ${headerHeight.value}px; }`);
  }
});

const { hasSubnav, subnav } = useLayout();

const { isScreenOpen, closeScreen, toggleScreen } = useNav();
provide(navInjectionKey, { closeScreen });
</script>

<template>
  <header class="Header" :class="{ 'screen-open': isScreenOpen }" ref="header">
    <div class="vp-container">
      <NavBar :is-screen-open="isScreenOpen" @toggle-screen="toggleScreen">
        <template #nav-bar-title-before>
          <slot name="nav-bar-title-before" />
        </template>
        <template #nav-bar-title-after>
          <slot name="nav-bar-title-after" />
        </template>
      </NavBar>
      <SubNav v-if="hasSubnav" v-bind="subnav[0]" />
      <NavScreen :open="isScreenOpen">
        <template #nav-screen-content-before>
          <slot name="nav-screen-content-before" />
        </template>
        <template #nav-screen-content-after>
          <slot name="nav-screen-content-after" />
        </template>
      </NavScreen>
    </div>
  </header>
</template>

<style scoped>
.Header {
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-nav);
  width: 100%;
  pointer-events: none;
  transition: background-color 0.25s !important;
}

.Header .vp-container {
  flex-direction: column;
}
</style>
