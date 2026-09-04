<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed } from "vue";
import { useData } from "../composables/data";
import { useLayout } from "../composables/layout";

const { theme } = useData();

const route = useRoute();
const { hasSidebar, hasAside } = useLayout();

const pageName = computed(() => route.path.replace(/[./]+/g, "_").replace(/_html$/, ""));
</script>

<template>
  <div class="Doc" :class="{ 'has-sidebar': hasSidebar, 'has-aside': hasAside }">
    <slot name="doc-top" />
    <div class="container">
      <Content class="vp-md" :class="[pageName, theme.externalLinkIcon && 'external-link-icon-enabled']" />
    </div>
    <slot name="doc-footer" />
    <slot name="doc-bottom" />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 960px) {
  .Doc.has-sidebar .container {
    padding: var(--vp-aside-py) 48px;
  }

  .Doc:not(.has-sidebar) .container {
    padding: var(--vp-aside-py) 48px var(--vp-aside-py) 0;
  }
}
</style>
