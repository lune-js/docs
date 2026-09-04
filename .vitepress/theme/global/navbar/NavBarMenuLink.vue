<script lang="ts" setup>
import { useRoute } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import { useData } from "../../composables/data";
import { isActive } from "../../support/utils";
import Link from "../Link.vue";

const props = defineProps<{
  item: DefaultTheme.NavItemWithLink;
}>();

const route = useRoute();

const classes = computed(() => {
  return {
    NavBarMenuLink: true,
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
    <span v-html="item.text"></span>
  </Link>
</template>

<style scoped>
.NavBarMenuLink {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.NavBarMenuLink.active {
  color: var(--vp-c-brand-1);
}

.NavBarMenuLink:hover {
  color: var(--vp-c-brand-1);
}
</style>
