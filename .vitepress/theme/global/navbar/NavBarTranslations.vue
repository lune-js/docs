<script lang="ts" setup>
import { useData } from "../../composables/data";
import { useLangs } from "../../composables/langs";
import Flyout from "../Flyout.vue";
import { MenuLink } from "../menu";

const { theme } = useData();
const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });
</script>

<template>
  <Flyout
    v-if="localeLinks.length && currentLang.label"
    class="NavBarTranslations"
    icon="vpi-languages"
    :label="theme.langMenuLabel || 'Change language'"
  >
    <div class="items">
      <p class="title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <MenuLink :item="locale" :lang="locale.lang" :hreflang="locale.lang" rel="alternate" :dir="locale.dir" />
      </template>
    </div>
  </Flyout>
</template>

<style scoped>
.NavBarTranslations {
  display: none;
}

@media (min-width: 1280px) {
  .NavBarTranslations {
    display: flex;
    align-items: center;
  }
}

.title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
</style>
