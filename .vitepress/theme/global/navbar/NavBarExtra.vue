<script lang="ts" setup>
import { computed } from "vue";
import VPSocialLinks from "../../components/VPSocialLinks.vue";
import { useData } from "../../composables/data";
import { useLangs } from "../../composables/langs";
import Flyout from "../Flyout.vue";
import { MenuLink } from "../menu";
import Switch from "../Switch.vue";

const { site, theme } = useData();
const { localeLinks, currentLang } = useLangs({ linkToCorrespondingPage: true });

const hasExtraContent = computed(
  () => (localeLinks.value.length && currentLang.value.label) || site.value.appearance || theme.value.socialLinks
);
</script>

<template>
  <Flyout v-if="hasExtraContent" class="NavBarExtra" label="extra navigation">
    <div v-if="localeLinks.length && currentLang.label" class="group translations">
      <p class="trans-title">{{ currentLang.label }}</p>

      <template v-for="locale in localeLinks" :key="locale.link">
        <MenuLink
          :item="locale"
          :lang="locale.lang"
          :hreflang="locale.lang"
          rel="alternate"
          :dir="locale.dir"
          data-allow-mismatch="attribute"
        />
      </template>
    </div>

    <div v-if="site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'" class="group">
      <div class="item appearance">
        <p class="label">
          {{ theme.darkModeSwitchLabel || "Appearance" }}
        </p>
        <div class="appearance-action">
          <Switch />
        </div>
      </div>
    </div>

    <div v-if="theme.socialLinks" class="group">
      <div class="item social-links">
        <VPSocialLinks class="social-links-list" :links="theme.socialLinks" />
      </div>
    </div>
  </Flyout>
</template>

<style scoped>
.NavBarExtra {
  display: none;
  margin-right: -12px;
}

@media (min-width: 768px) {
  .NavBarExtra {
    display: block;
  }
}

@media (min-width: 1280px) {
  .NavBarExtra {
    display: none;
  }
}

.trans-title {
  padding: 0 24px 0 12px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.item.appearance,
.item.social-links {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.item.appearance {
  min-width: 176px;
}

.appearance-action {
  margin-right: -2px;
}

.social-links-list {
  margin: -4px -8px;
}
</style>
