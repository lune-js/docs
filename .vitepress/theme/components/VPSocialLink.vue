<script lang="ts" setup>
import type { DefaultTheme } from "vitepress/theme";
import { computed } from "vue";
import VPIcon from "./VPIcon.vue";

const props = defineProps<{
  icon: DefaultTheme.SocialLinkIcon;
  link: string;
  ariaLabel?: string;
  me: boolean;
}>();

const qualifiedIcon = computed(() =>
  typeof props.icon === "string" && !props.icon.includes(":") ? `simple-icons:${props.icon}` : props.icon
);
</script>

<template>
  <a
    class="VPSocialLink no-icon"
    :href="link"
    :aria-label="ariaLabel ?? (typeof icon === 'string' ? icon : '')"
    target="_blank"
    :rel="me ? 'me noopener' : 'noopener'"
  >
    <VPIcon :icon="qualifiedIcon" />
  </a>
</template>

<style scoped>
.VPSocialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}

.VPSocialLink:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s !important;
}

.VPSocialLink > :deep(svg),
.VPSocialLink > :deep([class^="vpi-"]) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
