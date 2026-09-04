<script lang="ts" setup>
import { inject, ref, watchPostEffect } from "vue";
import { useData } from "../composables/data";

const { isDark, theme } = useData();

const toggleAppearance = inject("toggle-appearance", () => {
  isDark.value = !isDark.value;
});

const switchTitle = ref("");

watchPostEffect(() => {
  switchTitle.value = isDark.value
    ? theme.value.lightModeSwitchTitle || "Switch to light theme"
    : theme.value.darkModeSwitchTitle || "Switch to dark theme";
});
</script>

<template>
  <button
    class="Switch"
    type="button"
    role="switch"
    :title="switchTitle"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <span class="check">
      <span class="icon">
        <span class="vpi-sun sun" />
        <span class="vpi-moon moon" />
      </span>
    </span>
  </button>
</template>

<style scoped>
.Switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition:
    background-color 0.25s,
    border-color 0.25s !important;
}

.Switch:hover {
  border-color: var(--vp-c-brand-1);
}

.check {
  position: absolute;
  top: 1px;
  /*rtl:ignore*/
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);
  transition: transform 0.25s !important;
}

.icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.icon :deep([class^="vpi-"]) {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  color: var(--vp-c-text-2);
}

.dark .icon :deep([class^="vpi-"]) {
  color: var(--vp-c-text-1);
  transition: opacity 0.25s !important;
}

.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .Switch :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
