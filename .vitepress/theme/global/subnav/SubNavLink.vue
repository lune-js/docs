<script lang="ts" setup>
import { useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import { isActive } from "../../support/utils";
import Link from "../Link.vue";

const props = defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const route = useRoute();

const classes = computed(() => {
  return {
    SubNavLink: true,
    active: isActive(
      route.data.relativePath,
      route.hash,
      props.item.activeMatch || href.value,
      !!props.item.activeMatch
    )
  };
});
const href = computed(() => (typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link));
</script>

<template>
  <Link :class="classes" :href :target="item.target" :rel="item.rel" :no-icon="item.noIcon" tabindex="0">
    {{ item.text }}
  </Link>
</template>

<style scoped>
.SubNavLink {
  font-size: 14px;
  position: relative;
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}

.SubNavLink::after {
  content: "";
  position: absolute;
  bottom: -9px;
  left: 0;
  height: 1px;
  width: 100%;
  transition:
    background-color 0.25s,
    color 0.25s !important;
}

.SubNavLink:hover::after {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-brand-1);
}

.SubNavLink.active {
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.SubNavLink.active:hover {
  color: var(--vp-c-brand-1);
}

.SubNavLink.active::after {
  background-color: var(--vp-c-brand-1);
}

.SubNavLink:hover {
  color: var(--vp-c-text-1);
}
</style>
