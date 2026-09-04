<script setup lang="ts">
import { inBrowser, useRoute } from "vitepress";
import { computed, provide, ref, useSlots, watch, watchEffect } from "vue";
import { useData } from "./composables/data";
import { layoutInfoInjectionKey, registerWatchers, useLayout } from "./composables/layout";
import { navInjectionKey, useNav } from "./composables/nav";
import { usePrevNext } from "./composables/prev-next";
import { useSidebarControl } from "./composables/sidebar";
import { Aside, Footer, Header, MobileMenu, SecondaryAside } from "./global";
import NotFound from "./NotFound.vue";
import { DocTemplate, HomeTemplate } from "./templates";

/**
 * Various Components
 * -------------------------------------------------------------------------- */

const { isOpen: isSidebarOpen, open: openSidebar, close: closeSidebar } = useSidebarControl();

const { page, frontmatter, theme } = useData();
const { hasAside, hasLocalNav, hasSidebar, hasNavbar, isHome } = useLayout();

/**
 * Skip Link
 * -------------------------------------------------------------------------- */

const route = useRoute();
const backToTop = ref();
watch(
  () => route.path,
  () => backToTop.value.focus()
);

/**
 * Home Template
 * -------------------------------------------------------------------------- */

const slots = useSlots();
const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);

provide(layoutInfoInjectionKey, { heroImageSlotExists });

/**
 * Header
 * -------------------------------------------------------------------------- */

const { closeScreen } = useNav();

provide(navInjectionKey, { closeScreen });

watchEffect(() => {
  if (inBrowser) {
    document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
  }
});

/**
 * Footer
 * -------------------------------------------------------------------------- */

const control = usePrevNext();

const hasControls = (control?: { text?: string; link?: string }) => {
  if (control === undefined) return false;
  return !!control.link || !!control.text;
};

const hasLastUpdated = computed(() => page.value.lastUpdated);
const showDocFooter = computed(
  () => !!hasLastUpdated.value || hasControls(control.value.prev) || hasControls(control.value.next)
);

/**
 * Backdrop
 * -------------------------------------------------------------------------- */

registerWatchers({ closeSidebar });

/**
 * Stars
 * -------------------------------------------------------------------------- */
const stars = computed(() =>
  Array.from({ length: 660 }, () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const size = Math.random() * (3 - 1) + 1;
    const twinkleDelay = Math.random() * 5;

    return { x, y, size, twinkleDelay, id: Math.random().toString(36).substring(2, 9) };
  })
);
</script>

<template>
  <div v-if="frontmatter.layout !== false" class="Layout" :class="frontmatter.pageClass">
    <slot name="layout-top" />

    <!-- SkipLink -->
    <span ref="backToTop" tabindex="-1" />
    <a href="#Content" class="SkipLink visually-hidden">
      {{ theme.skipToContentLabel || "Skip to content" }}
    </a>

    <!-- Backdrop -->
    <Transition name="fade" @click="closeSidebar">
      <div v-if="isSidebarOpen" class="Backdrop" />
    </Transition>

    <!-- Header -->
    <Header v-if="hasNavbar" />

    <!-- Mobile Menu -->
    <MobileMenu v-if="!isHome && (hasLocalNav || hasSidebar)" :open="isSidebarOpen" @open-menu="openSidebar" />

    <main class="Content" id="Content" :class="{ 'has-sidebar': hasSidebar, 'is-home': isHome }">
      <div class="vp-container">
        <Aside :open="isSidebarOpen">
          <template #sidebar-nav-before>
            <slot name="sidebar-nav-before" />
          </template>
          <template #sidebar-nav-after>
            <slot name="sidebar-nav-after" />
          </template>
        </Aside>

        <!-- Not Found Template -->
        <slot name="not-found" v-if="page.isNotFound" class="ContentStack">
          <NotFound />
        </slot>

        <!-- Page Template -->
        <div v-else-if="frontmatter.layout === 'page'" class="ContentStack Page">
          <slot name="page-top" />
          <Content />
          <slot name="page-bottom" />
        </div>

        <!-- Home Template -->
        <HomeTemplate v-else-if="isHome" class="ContentStack">
          <template #home-hero-before>
            <slot name="home-hero-before" />
          </template>
          <template #home-hero-info-before>
            <slot name="home-hero-info-before" />
          </template>
          <template #home-hero-info>
            <slot name="home-hero-info" />
          </template>
          <template #home-hero-info-after>
            <slot name="home-hero-info-after" />
          </template>
          <template #home-hero-actions-after>
            <slot name="home-hero-actions-after" />
          </template>
          <template #home-hero-image>
            <slot name="home-hero-image" />
          </template>
          <template #home-hero-after>
            <slot name="home-hero-after" />
          </template>
          <template #home-features-before>
            <slot name="home-features-before" />
          </template>
          <template #home-features-after>
            <slot name="home-features-after" />
          </template>
        </HomeTemplate>

        <!-- Custom Template -->
        <component
          v-else-if="frontmatter.layout && frontmatter.layout !== 'doc'"
          :is="frontmatter.layout"
          class="ContentStack"
        />

        <!-- Doc Template -->
        <DocTemplate v-else class="ContentStack">
          <template #doc-top>
            <slot name="doc-top" />
          </template>
          <template #doc-bottom>
            <slot name="doc-bottom" />
          </template>

          <!-- Footer -->
          <template #doc-footer v-if="showDocFooter">
            <Footer :control="control" :has-last-updated="hasLastUpdated" :show-doc-footer="showDocFooter" />
          </template>
        </DocTemplate>

        <SecondaryAside v-if="hasAside">
          <template #aside-top>
            <slot name="aside-top" />
          </template>
          <template #aside-outline-before>
            <slot name="aside-outline-before" />
          </template>
          <template #aside-outline-after>
            <slot name="aside-outline-after" />
          </template>
          <template #aside-ads-before>
            <slot name="aside-ads-before" />
          </template>
          <template #aside-ads-after>
            <slot name="aside-ads-after" />
          </template>
          <template #aside-bottom>
            <slot name="aside-bottom" />
          </template>
        </SecondaryAside>
      </div>
      <div class="stars">
        <div
          v-for="star in stars"
          :key="star.id"
          class="star"
          :style="{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: 'translate(-50%, -50%)',
            '--star-size': `${star.size}px`,
            '--star-color': 'var(--vp-button-brand-hover-bg)',
            '--twinkle-delay': `${star.twinkleDelay}s`,
            '--twinkle-duration': '2s'
          }"
        />
      </div>
    </main>

    <!-- Footer -->
    <Footer
      v-if="!showDocFooter"
      :control="control"
      :has-last-updated="hasLastUpdated"
      :show-doc-footer="showDocFooter"
    />
    <slot name="layout-bottom" />
  </div>
  <Content v-else />
</template>

<style scoped>
.Layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#Content .stars {
  position: absolute;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  inset-inline: 16px;
  inset-block: 0;
}

#Content .star {
  position: absolute;
  width: var(--star-size);
  height: var(--star-size);
  background-color: var(--star-color);
  border-radius: 50%;
  animation: twinkle var(--twinkle-duration) ease-in-out infinite;
  animation-delay: var(--twinkle-delay);
  will-change: opacity;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }
}

.ContentStack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

.Backdrop {
  position: fixed;
  top: 0;
  /*rtl:ignore*/
  right: 0;
  bottom: 0;
  /*rtl:ignore*/
  left: 0;
  z-index: var(--vp-z-index-backdrop);
  background: var(--vp-backdrop-bg-color);
  transition: opacity 0.25s;
}

.Backdrop.fade-enter-from,
.Backdrop.fade-leave-to {
  opacity: 0;
}

.Backdrop.fade-leave-active {
  transition-duration: 0.25s;
}

@media (min-width: 1280px) {
  .Backdrop {
    display: none;
  }
}

.SkipLink {
  position: fixed;
  top: 8px;
  left: 8px;
  padding: 8px 16px;
  z-index: 999;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  color: var(--vp-c-brand-1);
  box-shadow: var(--vp-shadow-3);
  background-color: var(--vp-c-bg);
}

.SkipLink:focus {
  height: auto;
  width: auto;
  clip: auto;
  clip-path: none;
}

@media (min-width: 1280px) {
  .SkipLink {
    top: 14px;
    left: 16px;
  }
}

.message,
.copyright {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
