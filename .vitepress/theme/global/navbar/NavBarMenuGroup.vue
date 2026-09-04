<script lang="ts" setup generic="T extends NavItemWithChildren | NavItemWithLink">
import { useRoute } from "vitepress";
import { computed } from "vue";
import { isActive } from "../../support/utils";
import type { NavItemWithChildren, NavItemWithLink } from "../../types";
import Flyout from "../Flyout.vue";

const props = defineProps<{
  item: T;
}>();

const route = useRoute();

const isChildActive = (navItem: NavItemWithChildren | NavItemWithLink) => {
  if ("link" in navItem) {
    return isActive(
      route.data.relativePath,
      route.hash,
      typeof navItem.link === "function" ? navItem.link(route.data) : navItem.link,
      !!props.item.activeMatch
    );
  }

  return navItem.items.some(isChildActive);
};

const childrenActive = computed(() => isChildActive(props.item));
const classes = {
  NavBarMenuGroup: true,
  active:
    isActive(route.data.relativePath, route.hash, props.item.activeMatch!, !!props.item.activeMatch) ||
    childrenActive.value
};
</script>

<template>
  <Flyout :class="classes" :button="item.text" :items="item.items" />
</template>
