<script lang="ts" setup generic="T extends NavItemWithLink">
import { useRoute } from "vitepress";
import { computed } from "vue";
import { isActive } from "../../support/utils";
import type { NavItemWithLink } from "../../types";
import Link from "../Link.vue";

const props = defineProps<{
  item: T;
  rel?: string;
}>();

const route = useRoute();

const href = computed(() => (typeof props.item.link === "function" ? props.item.link(route.data) : props.item.link));

defineOptions({ inheritAttrs: false });
</script>

<template>
  <div class="MenuLink">
    <Link
      v-bind="$attrs"
      :class="{
        active: isActive(route.data.relativePath, route.hash, item.activeMatch || href, !!item.activeMatch)
      }"
      :href
      :target="item.target"
      :rel="props.rel ?? item.rel"
      :no-icon="item.noIcon"
    >
      <span v-html="item.text"></span>
    </Link>
  </div>
</template>

<style scoped>
.MenuGroup + .MenuLink {
  margin: 12px -12px 0;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding: 12px 12px 0;
}

.link {
  display: block;
  border-radius: 6px;
  padding: 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-align: left;
  white-space: nowrap;
  transition:
    background-color 0.25s,
    color 0.25s;
}

.link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-default-soft);
}

.link.active {
  color: var(--vp-c-brand-1);
}
</style>
