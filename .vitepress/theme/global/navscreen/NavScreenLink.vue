<script lang="ts" setup>
import { useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { computed, inject } from "vue";
import { navInjectionKey } from "../../composables/nav";
import { isActive } from "../../support/utils";
import Link from "../Link.vue";

const props = defineProps<{
  type: "MenuLink" | "MenuGroupLink";
  item: DefaultTheme.NavItemWithLink;
}>();

const route = useRoute();

const classes = computed(() => {
  return {
    NavScreenLink: true,
    [props.type]: true,
    active: isActive(
      route.data.relativePath,
      route.hash,
      props.item.activeMatch || href.value,
      !!props.item.activeMatch
    )
  };
});
const href = computed(() => (typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link));

const { closeScreen } = inject(navInjectionKey)!;
</script>

<template>
  <Link :class="classes" :href :target="item.target" :rel="item.rel" :no-icon="item.noIcon" @click="closeScreen">
    <span v-html="item.text"></span>
  </Link>
</template>

<style scoped>
.NavScreenLink {
  display: block;
  font-size: 14px;
  color: var(--vp-c-text-1);
  transition:
    border-color 0.25s,
    color 0.25s !important;
}

.NavScreenLink.MenuLink {
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 12px 0 11px;
  line-height: 24px;
  font-weight: 500;
}

.NavScreenLink.MenuGroupLink {
  margin-left: 12px;
  line-height: 32px;
  font-weight: 400;
}

.NavScreenLink:hover {
  color: var(--vp-c-brand-1);
}

.NavScreenLink.active {
  color: var(--vp-c-brand-1);
}
</style>
