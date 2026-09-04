<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";
import NavScreenLink from "./NavScreenLink.vue";

defineProps<{
  text?: string;
  items: DefaultTheme.NavItemWithLink[];
}>();
</script>

<template>
  <div class="NavScreenMenuGroupSection">
    <p v-if="text" class="title">{{ text }}</p>
    <NavScreenLink v-for="item in items" :key="item.text" :item type="MenuGroupLink" />
  </div>
</template>

<style scoped>
.NavScreenMenuGroupSection {
  display: block;
}

.title {
  line-height: 32px;
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
}
</style>
