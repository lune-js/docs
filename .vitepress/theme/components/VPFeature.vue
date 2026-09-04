<script setup lang="ts">
import type { DefaultTheme } from "vitepress/theme";
import { Image, Link } from "../global";

defineProps<{
  icon?: DefaultTheme.FeatureIcon;
  title: string;
  details?: string;
  link?: string;
  linkText?: string;
  rel?: string;
  target?: string;
}>();
</script>

<template>
  <Link class="VPFeature" :href="link" :rel :target :no-icon="true" :tag="link ? 'a' : 'div'">
    <article class="box">
      <div v-if="typeof icon === 'object' && icon.wrap" class="icon">
        <Image :image="icon" :alt="icon.alt" :height="icon.height || 48" :width="icon.width || 48" />
      </div>
      <Image
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <h2 class="title" v-html="title"></h2>
      <ul v-if="Array.isArray(details)" class="details">
        <li v-for="item in details" :key="item" v-html="item"></li>
      </ul>
      <p v-else-if="details" class="details" v-html="details"></p>

      <div v-if="linkText" class="link-text">
        <p class="link-text-value">{{ linkText }} <span class="vpi-arrow-right link-text-icon" /></p>
      </div>
    </article>
  </Link>
</template>

<style scoped>
.VPFeature {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition:
    background-color 0.25s,
    border-color 0.25s !important;
}

.VPFeature.link:hover {
  border-color: var(--vp-c-brand-1);
}

.VPFeature:hover :deep(.wing) {
  animation: flutter 0.25s alternate forwards infinite linear;
  transform-origin: 250px;
}

.box {
  display: flex;
  flex-direction: column;
  padding: 24px;
  height: 100%;
}

.box > :deep(.Image) {
  margin-bottom: 20px;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 6px;
  background-color: var(--vp-c-default-soft);
  width: 48px;
  height: 48px;
  font-size: 24px;
  transition: background-color 0.25s !important;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
}

.details {
  flex-grow: 1;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}

ul.details {
  list-style-type: disc;
  padding-left: 14px;
}

.link-text {
  padding-top: 8px;
}

.link-text-value {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s !important;
}

.link-text-icon {
  margin-left: 6px;
}
</style>
