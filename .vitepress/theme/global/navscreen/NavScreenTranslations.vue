<script setup lang="ts">
import { ref } from "vue";
import { useLangs } from "../../composables/langs";
import Link from "../Link.vue";

const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div v-if="localeLinks.length && currentLang.label" class="NavScreenTranslations" :class="{ open: isOpen }">
    <button class="title" @click="toggle">
      <span class="vpi-languages icon lang" />
      {{ currentLang.label }}
      <span class="vpi-chevron-down icon chevron" />
    </button>

    <ul class="list">
      <li v-for="locale in localeLinks" :key="locale.link" class="item">
        <Link class="link" :href="locale.link" :lang="locale.lang" :dir="locale.dir">
          {{ locale.text }}
        </Link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.NavScreenTranslations {
  height: 24px;
  overflow: hidden;
}

.NavScreenTranslations.open {
  height: auto;
}

.title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  transition: color 0.25s !important;
}

.icon {
  font-size: 16px;
}

.icon.lang {
  margin-right: 8px;
}

.icon.chevron {
  margin-left: 4px;
}

.list {
  padding: 4px 0 0 24px;
}

.link {
  line-height: 32px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  transition: color 0.25s !important;
}
</style>
