<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { computed, inject } from "vue";
import VPButton from "../components/VPButton.vue";
import VPFeatures from "../components/VPFeatures.vue";
import { useData } from "../composables/data";
import { layoutInfoInjectionKey } from "../composables/layout";
import { Image } from "../global";

const { frontmatter: fm, theme } = useData();

const { width: vw } = useWindowSize({
  initialWidth: 0,
  includeScrollbar: false
});

const { heroImageSlotExists } = inject(layoutInfoInjectionKey, {
  heroImageSlotExists: computed(() => false)
});
</script>

<template>
  <div
    class="Home"
    :class="{
      'external-link-icon-enabled': theme.externalLinkIcon
    }"
  >
    <section id="hero">
      <div v-if="fm.hero.image || heroImageSlotExists" class="image">
        <div class="image-container">
          <div class="image-bg" />
          <slot name="home-hero-image">
            <Image v-if="fm.hero.image" class="image-src" :image="fm.hero.image" />
          </slot>
        </div>
      </div>
      <h1 class="heading">
        <span v-if="fm.hero.name" v-html="fm.hero.name" class="name clip"></span>
      </h1>
      <p v-if="fm.hero.tagline" v-html="fm.hero.tagline" class="tagline"></p>
      <div v-if="fm.hero.actions" class="actions">
        <VPButton
          v-for="action in fm.hero.actions"
          :key="action.link"
          class="action"
          tag="a"
          size="medium"
          :theme="action.theme"
          :text="action.text"
          :href="action.link"
          :target="action.target"
          :rel="action.rel"
        />
      </div>
    </section>

    <slot name="home-features-before" />
    <VPFeatures v-if="fm.features" class="HomeFeatures" :features="fm.features" />
    <slot name="home-features-after" />

    <div
      v-if="fm.markdownStyles !== false"
      class="vp-md container"
      :style="vw ? { '--vp-offset': `calc(50% - ${vw / 2}px)` } : {}"
      data-allow-mismatch="style"
    >
      <Content />
    </div>
    <Content v-else />
  </div>
</template>

<style scoped>
#hero {
  display: flex;
  flex-direction: column;
  padding: 56px 0;
  text-align: center;
}

@media (min-width: 640px) {
  #hero {
    padding: 96px 0;
  }
}

.heading {
  font-size: 36px;
  line-height: 1.25;
  font-weight: 900;
  letter-spacing: -0.5px;
  max-width: 960px;
  margin: 0px auto;
}

@media (min-width: 640px) {
  .heading {
    font-size: 48px;
  }
}

@media (min-width: 768px) {
  .heading {
    font-size: 64px;
  }
}

@media (min-width: 960px) {
  .heading {
    font-size: 76px;
    letter-spacing: -1.5px;
  }
}

.name {
  color: var(--vp-home-hero-name-color);
}

.clip {
  background: var(--vp-home-hero-name-background);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: var(--vp-home-hero-name-color);
}

.tagline {
  max-width: 410px;
  line-height: 1.5;
  color: var(--vt-c-text-2);
  transition: color 0.25s;
  font-size: 18px;
  margin: 32px auto 48px;
}

@media (min-width: 768px) {
  .tagline {
    max-width: 960px;
    font-size: 22px;
    margin: 24px auto 40px;
  }
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
}

@media (min-width: 640px) {
  .actions {
    flex-direction: row;
  }
}

.container {
  margin: auto;
  width: 100%;
  max-width: 1280px;
  padding: 0 24px;
}

@media (min-width: 640px) {
  .container {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .container {
    padding: 0 64px;
  }
}
</style>
