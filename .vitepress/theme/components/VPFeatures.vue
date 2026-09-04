<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import VPFeature from "./VPFeature.vue";

export interface Feature {
  icon?: DefaultTheme.FeatureIcon;
  title: string;
  details: string;
  link?: string;
  linkText?: string;
  rel?: string;
  target?: string;
}

const props = defineProps<{
  features: Feature[];
}>();

const grid = computed(() => {
  const length = props.features.length;

  if (!length) return "";

  if (length === 2) return "grid-2";
  if (length === 3) return "grid-3";
  if (length % 3 === 0) return "grid-6";

  return "grid-4";
});
</script>

<template>
  <section v-if="features" class="VPFeatures">
    <div class="container">
      <div class="items" :class="[grid]">
        <div v-for="feature in features" :key="feature.title" class="item">
          <VPFeature
            :icon="feature.icon"
            :title="feature.title"
            :details="feature.details"
            :link="feature.link"
            :link-text="feature.linkText"
            :rel="feature.rel"
            :target="feature.target"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VPFeatures {
  position: relative;
}

.items {
  display: grid;
  gap: 8px;
}

@media (min-width: 640px) {
  .items.grid-2,
  .items.grid-4,
  .items.grid-6 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .items.grid-2,
  .items.grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .items.grid-3,
  .items.grid-6 {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 960px) {
  .items.grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
