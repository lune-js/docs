<script lang="ts" setup>
import type { NavItemWithLinkAndSubNav } from "../../types";
import SubNavLink from "./SubNavLink.vue";

defineProps<NavItemWithLinkAndSubNav>();
</script>

<template>
  <nav aria-labelledby="secondary-nav-aria-label" class="SubNav">
    <span id="secondary-nav-aria-label" class="visually-hidden">Secondary Navigation</span>
    <SubNavLink v-for="item in subNav" :key="JSON.stringify(item)" :item />
  </nav>
</template>

<style scoped>
.SubNav {
  display: none;
  align-items: center;
  flex-direction: row;
  gap: 24px;
  padding-block: 8px;
}

.SubNav :deep(*) {
  pointer-events: auto;
}

@media (min-width: 768px) {
  .SubNav {
    display: flex;
  }
}
</style>
