<script setup lang="ts">
import { useScrollLock } from "@vueuse/core";
import { inBrowser } from "vitepress";
import NavScreenAppearance from "./NavScreenAppearance.vue";
import NavScreenMenu from "./NavScreenMenu.vue";
import NavScreenSocialLinks from "./NavScreenSocialLinks.vue";
import NavScreenTranslations from "./NavScreenTranslations.vue";

defineProps<{
  open: boolean;
}>();

const isLocked = useScrollLock(inBrowser ? document.body : null);
</script>

<template>
  <transition name="fade" @enter="isLocked = true" @after-leave="isLocked = false">
    <div v-if="open" class="NavScreen" id="NavScreen">
      <div class="container">
        <slot name="nav-screen-content-before" />
        <NavScreenMenu class="menu" />
        <NavScreenTranslations class="translations" />
        <NavScreenAppearance class="appearance" />
        <NavScreenSocialLinks class="social-links" />
        <slot name="nav-screen-content-after" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.NavScreen {
  position: fixed;
  top: calc(var(--vp-nav-height) + 1px);
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: var(--vp-nav-screen-bg-color);
  overflow-y: auto;
  transition: background-color 0.25s !important;
  pointer-events: auto;
}

.NavScreen.fade-enter-active,
.NavScreen.fade-leave-active {
  transition: opacity 0.25s;
}

.NavScreen.fade-enter-active .container,
.NavScreen.fade-leave-active .container {
  transition: transform 0.25s ease;
}

.NavScreen.fade-enter-from,
.NavScreen.fade-leave-to {
  opacity: 0;
}

.NavScreen.fade-enter-from .container,
.NavScreen.fade-leave-to .container {
  transform: translateY(-8px);
}

@media (min-width: 768px) {
  .NavScreen {
    display: none;
  }
}

.container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
}

.menu + .translations,
.menu + .appearance,
.translations + .appearance {
  margin-top: 24px;
}

.menu + .social-links {
  margin-top: 16px;
}

.appearance + .social-links {
  margin-top: 16px;
}
</style>
