<script setup lang="ts">
import { computed } from "vue";
import { useData } from "../../composables/data";
import { useLangs } from "../../composables/langs";
import { normalizeLink } from "../../support/utils";
import Image from "../Image.vue";

const { theme } = useData();
const { currentLang } = useLangs();

const link = computed(() =>
  typeof theme.value.logoLink === "string" ? theme.value.logoLink : theme.value.logoLink?.link
);

const rel = computed(() => (typeof theme.value.logoLink === "string" ? undefined : theme.value.logoLink?.rel));
const marginRight = computed(() => (theme.value.siteTitle ? "8px" : "0px"));
const target = computed(() => (typeof theme.value.logoLink === "string" ? undefined : theme.value.logoLink?.target));
</script>

<template>
  <a class="NavBarTitle" :href="link ?? normalizeLink(currentLang.link)" :rel :target>
    <slot name="nav-bar-title-before" />
    <Image v-if="theme.logo" class="logo" :image="theme.logo" />
    <span v-if="theme.siteTitle" v-html="theme.siteTitle"></span>
    <slot name="nav-bar-title-after" />
  </a>
</template>

<style scoped>
.NavBarTitle {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: opacity 0.25s;
}

@media (min-width: 960px) {
  .NavBarTitle {
    flex-shrink: 0;
  }
}

:deep(.logo) {
  margin-right: v-bind("marginRight");
  height: var(--vp-nav-logo-height);
}
</style>
