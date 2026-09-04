<script lang="ts" setup generic="T extends NavItem">
import type { NavItem } from "../../types";
import MenuLink from "./MenuLink.vue";

defineProps<{
  text?: string;
  items: T[];
}>();
</script>

<template>
  <div class="MenuGroup">
    <p v-if="text" class="title">{{ text }}</p>

    <template v-for="item in items" :key="JSON.stringify(item)">
      <MenuLink v-if="'link' in item" :item />
    </template>
  </div>
</template>

<style scoped>
.MenuGroup {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding: 12px 12px 0;
}

.MenuGroup:first-child {
  margin-top: 0;
  border-top: 0;
  padding-top: 0;
}

.MenuGroup + .MenuGroup {
  margin-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
}

.title {
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  transition: color 0.25s;
}
</style>
