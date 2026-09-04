<script lang="ts" setup generic="T extends NavItem">
import { computed, ref } from "vue";
import { useFlyout } from "../composables/flyout";
import { useLayout } from "../composables/layout";
import type { NavItem } from "../types";
import { Menu } from "./menu";

const props = defineProps<{
  icon?: string;
  button?: string;
  label?: string;
  items?: T[];
}>();

const open = ref(false);
const el = ref<HTMLElement>();

const { hasSubnav } = useLayout();
const top = computed(() => `calc(var(--vp-nav-height) / ${hasSubnav.value ? "3" : "1.5"})`);

useFlyout({ el, onBlur });

function onBlur() {
  open.value = false;
}
</script>

<template>
  <div class="Flyout" ref="el" @mouseenter="open = true" @mouseleave="open = false">
    <button
      type="button"
      class="button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="button || icon" class="text">
        <span v-if="icon" :class="[icon, 'option-icon']" />
        <span v-if="button" v-html="button"></span>
        <span class="vpi-chevron-down text-icon" />
      </span>

      <span v-else class="vpi-more-horizontal icon" />
    </button>

    <div class="menu-container">
      <Menu :items>
        <slot />
      </Menu>
    </div>
  </div>
</template>

<style scoped>
.Flyout {
  position: relative;
}

.Flyout:hover {
  color: var(--vp-c-brand-1);
  transition: color 0.25s;
}

.Flyout:hover .text {
  color: var(--vp-c-text-2);
}

.Flyout:hover .icon {
  fill: var(--vp-c-text-2);
}

.Flyout.active .text {
  color: var(--vp-c-brand-1);
}

.Flyout.active:hover .text {
  color: var(--vp-c-brand-2);
}

.button[aria-expanded="false"] + .menu-container {
  opacity: 0;
  visibility: hidden;
  transform: translateY(0);
}

.Flyout:hover .menu-container,
.button[aria-expanded="true"] + .menu-container {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.button {
  display: flex;
  align-items: center;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.text {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}

.option-icon {
  margin-right: 0px;
  font-size: 16px;
}

.text-icon {
  margin-left: 4px;
  font-size: 14px;
}

.icon {
  font-size: 20px;
  transition: fill 0.25s;
}

.menu-container {
  position: absolute;
  top: v-bind("top");
  z-index: 10;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.25s,
    visibility 0.25s,
    transform 0.25s;
}
</style>
