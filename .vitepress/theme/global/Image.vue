<script setup lang="ts">
import { withBase } from "vitepress";
import type { DefaultTheme } from "vitepress/theme";

defineProps<{
  image: DefaultTheme.ThemeableImage;
  alt?: string;
}>();

defineOptions({ inheritAttrs: false });
</script>

<template>
  <template v-if="image">
    <img
      v-if="typeof image === 'string' || 'src' in image"
      class="Image"
      v-bind="typeof image === 'string' ? $attrs : { ...image, ...$attrs }"
      :src="withBase(typeof image === 'string' ? image : image.src)"
      :alt="alt ?? (typeof image === 'string' ? '' : image.alt || '')"
    />
    <template v-else>
      <Image class="dark" :image="image.dark" :alt="image.alt" v-bind="$attrs" />
      <Image class="light" :image="image.light" :alt="image.alt" v-bind="$attrs" />
    </template>
  </template>
</template>

<style scoped>
.Image {
  transition:
    display 0.25s,
    opacity 0.25s !important;
}

html:not(.dark) .Image.dark {
  display: none;
  opacity: 0;
}

html:not(.dark) .Image.light {
  display: block;
  opacity: 1;
}

.dark .Image.dark {
  display: block;
  opacity: 1;
}

.dark .Image.light {
  display: none;
  opacity: 0;
}
</style>
