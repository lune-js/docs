<script lang="ts" setup>
import { useData } from "../../composables/data";
import Switch from "../Switch.vue";

const { site, theme } = useData();
</script>

<template>
  <div
    v-if="site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'"
    class="NavScreenAppearance"
  >
    <p class="text">
      {{ theme.darkModeSwitchLabel || "Appearance" }}
    </p>
    <Switch />
  </div>
</template>

<style scoped>
.NavScreenAppearance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: var(--vp-c-bg-soft);
  transition: background-color 0.25s !important;
}

.text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}
</style>
