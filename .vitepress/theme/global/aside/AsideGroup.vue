<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { onBeforeUnmount, onMounted, ref } from "vue";
import AsideItem from "./AsideItem.vue";

defineProps<{
  items: DefaultTheme.SidebarItem[];
}>();

const disableTransition = ref(true);

let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  timer = setTimeout(() => {
    timer = null;
    disableTransition.value = false;
  }, 300);
});

onBeforeUnmount(() => {
  if (timer != null) {
    clearTimeout(timer);
    timer = null;
  }
});
</script>

<template>
  <div v-for="item in items" :key="item.text" class="group" :class="{ 'no-transition': disableTransition }">
    <AsideItem :item :depth="0" />
  </div>
</template>

<style scoped>
.no-transition :deep(.caret-icon) {
  transition: none;
}

.group + .group {
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding-top: 10px;
}

@media (min-width: 960px) {
  .group {
    padding-top: 10px;
    width: calc(var(--vp-aside-width) - 36px);
  }
}
</style>
