<script setup lang="ts">
import { useData } from "../../composables/data";
import { useLayout } from "../../composables/layout";
import { resolveTitle } from "../../composables/outline";
import OutlineItem from "../OutlineItem.vue";

const { theme } = useData();

const { headers, hasLocalNav } = useLayout();
</script>

<template>
  <nav aria-labelledby="aside-outline-aria-label" class="SecondaryAsideOutline" :class="{ 'has-outline': hasLocalNav }">
    <div class="container">
      <div aria-level="2" class="outline-title" id="aside-outline-aria-label" role="heading">
        {{ resolveTitle(theme) }}
      </div>

      <OutlineItem :headers :root="true" />
    </div>
  </nav>
</template>

<style scoped>
.SecondaryAsideOutline {
  display: none;
}

.SecondaryAsideOutline.has-outline {
  display: block;
}

.container {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.outline-title {
  line-height: 32px;
  font-size: 14px;
  font-weight: 600;
}
</style>
