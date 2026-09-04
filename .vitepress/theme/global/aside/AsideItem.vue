<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import { useSidebarItemControl } from "../../composables/sidebar";
import Link from "../Link.vue";

const props = defineProps<{
  item: DefaultTheme.SidebarItem;
  depth: number;
}>();

const { collapsed, collapsible, isLink, isActiveLink, hasActiveLink, hasChildren, toggle } = useSidebarItemControl(
  computed(() => props.item)
);

const sectionTag = computed(() => (hasChildren.value ? "section" : `div`));

const linkTag = computed(() => (isLink.value ? "a" : "div"));

const textTag = computed(() => {
  return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
});

const itemRole = computed(() => (isLink.value ? undefined : "button"));

const classes = computed(() => [
  [`level-${props.depth}`],
  { collapsible: collapsible.value },
  { collapsed: collapsed.value },
  { "is-link": isLink.value },
  { "is-active": isActiveLink.value },
  { "has-active": hasActiveLink.value }
]);

function onItemInteraction(e: MouseEvent | Event) {
  if ("key" in e && e.key !== "Enter") return;
  if (!props.item.link) toggle();
}

function onCaretClick() {
  if (props.item.link) toggle();
}
</script>

<template>
  <component :is="sectionTag" class="AsideItem" :class="classes">
    <div
      v-if="item.text"
      class="item"
      :role="itemRole"
      v-on="item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {}"
      :tabindex="item.items && 0"
    >
      <div class="indicator" />

      <Link v-if="item.link" :tag="linkTag" class="link" :href="item.link" :rel="item.rel" :target="item.target">
        <component :is="textTag" class="text" v-html="item.text" />
      </Link>
      <component v-else :is="textTag" class="text" v-html="item.text" />

      <div
        v-if="item.collapsed != null && item.items && item.items.length"
        class="caret"
        role="button"
        aria-label="toggle section"
        @click="onCaretClick"
        @keydown.enter="onCaretClick"
        tabindex="0"
      >
        <span class="vpi-chevron-right caret-icon" />
      </div>
    </div>

    <div v-if="item.items && item.items.length" class="items">
      <template v-if="depth < 5">
        <AsideItem v-for="i in item.items" :key="i.text" :item="i" :depth="depth + 1" />
      </template>
    </div>
  </component>
</template>

<style scoped>
.AsideItem.level-0 {
  padding-bottom: 24px;
}

.AsideItem.collapsed.level-0 {
  padding-bottom: 10px;
}

.item {
  position: relative;
  display: flex;
  width: 100%;
  border-radius: 6px;
  padding: 0 12px;
  transition: background-color 0.25s !important;
}

.AsideItem.collapsible > .item {
  cursor: pointer;
}

.indicator {
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: -5px;
  width: 2px;
  border-radius: 2px;
  transition: background-color 0.25s;
}

.AsideItem.level-2.is-active > .item > .indicator,
.AsideItem.level-3.is-active > .item > .indicator,
.AsideItem.level-4.is-active > .item > .indicator,
.AsideItem.level-5.is-active > .item > .indicator {
  background-color: var(--vp-c-brand-1);
}

.link {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.text {
  flex-grow: 1;
  padding: 4px 0;
  line-height: 24px;
  font-size: 14px;
  transition: color 0.25s !important;
}

.AsideItem.level-0 .text {
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.AsideItem.level-0.is-active > .item,
.AsideItem.level-1.is-active > .item,
.AsideItem.level-0 > .item:not([role="button"]):hover,
.AsideItem.level-1 > .item:not([role="button"]):hover,
.AsideItem.level-0.has-active > .item:not([role="button"]),
.AsideItem.level-1.has-active > .item:not([role="button"]) {
  background-color: var(--vp-c-default-soft);
}

.AsideItem.level-1 .text,
.AsideItem.level-2 .text,
.AsideItem.level-3 .text,
.AsideItem.level-4 .text,
.AsideItem.level-5 .text {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.AsideItem.level-0.has-active > .item > .text,
.AsideItem.level-1.has-active > .item > .text,
.AsideItem.level-2.has-active > .item > .text,
.AsideItem.level-3.has-active > .item > .text,
.AsideItem.level-4.has-active > .item > .text,
.AsideItem.level-5.has-active > .item > .text,
.AsideItem.level-0.has-active > .item > .link > .text,
.AsideItem.level-1.has-active > .item > .link > .text,
.AsideItem.level-2.has-active > .item > .link > .text,
.AsideItem.level-3.has-active > .item > .link > .text,
.AsideItem.level-4.has-active > .item > .link > .text,
.AsideItem.level-5.has-active > .item > .link > .text {
  color: var(--vp-c-text-1);
}

.AsideItem.level-0.is-active > .item .link > .text,
.AsideItem.level-1.is-active > .item .link > .text,
.AsideItem.level-2.is-active > .item .link > .text,
.AsideItem.level-3.is-active > .item .link > .text,
.AsideItem.level-4.is-active > .item .link > .text,
.AsideItem.level-5.is-active > .item .link > .text,
.AsideItem.level-0.is-link > .item > .link:hover .text,
.AsideItem.level-1.is-link > .item > .link:hover .text,
.AsideItem.level-2.is-link > .item > .link:hover .text,
.AsideItem.level-3.is-link > .item > .link:hover .text,
.AsideItem.level-4.is-link > .item > .link:hover .text,
.AsideItem.level-5.is-link > .item > .link:hover .text {
  color: var(--vp-c-brand-1);
}

.caret {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -7px;
  width: 32px;
  height: 32px;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: color 0.25s;
  flex-shrink: 0;
  transition: color 0.25s !important;
}

.item:hover .caret {
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}

.item:hover .caret:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s !important;
}

.caret-icon {
  font-size: 18px;
  /*rtl:ignore*/
  transform: rotate(90deg);
  transition: transform 0.25s;
}

.AsideItem.collapsed .caret-icon {
  transform: rotate(0) /*rtl:rotate(180deg)*/;
}

.AsideItem.level-1 .items,
.AsideItem.level-2 .items,
.AsideItem.level-3 .items,
.AsideItem.level-4 .items,
.AsideItem.level-5 .items {
  border-left: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s !important;
  padding-left: 4px;
  margin-left: 12px;
}

.AsideItem.collapsed .items {
  display: none;
}
</style>
