<script setup lang="ts">
import { ref } from "vue";
import { useData } from "../../composables/data";
import { useActiveAnchor } from "../../composables/outline";
import SecondaryAsideCarbonAds from "./SecondaryAsideCarbonAds.vue";
import SecondaryAsideOutline from "./SecondaryAsideOutline.vue";

const { theme } = useData();

const aside = ref();
const marker = ref();

useActiveAnchor(aside, marker);
</script>

<template>
  <aside id="toc" class="SecondaryAside" aria-label="secondary-aside" ref="aside">
    <div class="aside-container">
      <slot name="aside-top" />
      <div class="aside-marker" ref="marker" />

      <slot name="aside-outline-before" />
      <SecondaryAsideOutline />
      <slot name="aside-outline-after" />

      <div class="spacer" />

      <slot name="aside-ads-before" />
      <SecondaryAsideCarbonAds v-if="theme.carbonAds" :carbon-ads="theme.carbonAds" />
      <slot name="aside-ads-after" />

      <slot name="aside-bottom" />
    </div>
  </aside>
</template>

<style scoped>
.SecondaryAside {
  display: none;
  flex-shrink: 0;
  position: sticky;
  border-left: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  top: var(--vp-nav-height);
  padding-block: var(--vp-aside-py);
  padding-inline-start: var(--vp-aside-px);
  height: calc(100dvh - var(--vp-nav-height));
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  width: var(--vp-aside-width);
  z-index: var(--vp-z-index-sidebar);
  box-shadow: var(--vp-c-shadow-3);
  overscroll-behavior: contain;
}

@media (min-width: 1280px) {
  .SecondaryAside {
    display: block;
  }
}

.aside-container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-marker {
  position: absolute;
  top: 32px;
  left: 0;
  z-index: 0;
  opacity: 0;
  width: 2px;
  border-radius: 2px;
  height: 18px;
  background-color: var(--vp-c-brand-1);
  transition:
    top 0.25s cubic-bezier(0, 1, 0.5, 1),
    background-color 0.25s,
    opacity 0.25s;
}
</style>
