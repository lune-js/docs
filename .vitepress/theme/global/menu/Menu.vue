<script lang="ts" setup generic="T extends NavItem">
import type { NavItem } from "../../types";
import MenuGroup from "./MenuGroup.vue";
import MenuLink from "./MenuLink.vue";

defineProps<{
  items?: T[];
}>();
</script>

<template>
  <div class="Menu">
    <div v-if="items" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <MenuLink v-if="'link' in item" :item />
        <MenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </div>

    <slot />
  </div>
</template>

<style scoped>
.Menu {
  border-radius: 12px;
  padding: 12px;
  min-width: 128px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
  transition:
    background-color 0.25s,
    border 0.25s;
  overflow-y: auto;
}

.Menu :deep(.group) {
  margin: 0 -12px;
  padding: 0 12px 12px;
}

.Menu :deep(.group + .group) {
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding: 11px 12px 12px;
}

.Menu :deep(.group:last-child) {
  padding-bottom: 0;
}

.Menu :deep(.group + .item) {
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding: 11px 16px 0;
}

.Menu :deep(.item) {
  padding: 0 16px;
  white-space: nowrap;
}

.Menu :deep(.label) {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}

.Menu :deep(.action) {
  padding-left: 24px;
}
</style>
