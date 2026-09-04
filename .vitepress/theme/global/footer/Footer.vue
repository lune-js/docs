<script setup lang="ts">
import { computed } from "vue";
import { useData } from "../../composables/data";
import { useEditLink } from "../../composables/edit-link";
import { useLayout } from "../../composables/layout";
import Link from "../Link.vue";
import FooterLastUpdated from "./FooterLastUpdated.vue";

const { theme, frontmatter } = useData();
const { isHome } = useLayout();

const props = defineProps<{
  control: {
    prev?: {
      text?: string;
      link?: string;
    };
    next?: {
      text?: string;
      link?: string;
    };
  };
  showDocFooter: boolean;
  hasLastUpdated?: number;
}>();

const marginTop = isHome.value ? { mobile: "32px", desktop: "64px" } : { mobile: 0, desktop: 0 };
const paddingInline = computed(() => (props.showDocFooter ? { md: 0, lg: 0 } : { md: "16px", lg: "24px" }));

const editLink = useEditLink();
const hasEditLink = computed(() => editLink && frontmatter.value.editLink !== false);
</script>

<template>
  <footer v-if="frontmatter.footer !== false" class="Footer">
    <div class="vp-container">
      <slot name="doc-footer-before" />

      <div v-if="(hasEditLink && showDocFooter) || hasLastUpdated" class="edit-info">
        <div v-if="hasEditLink" class="edit-link">
          <Link class="edit-link-button" :href="editLink.url" :no-icon="true">
            <span class="vpi-square-pen edit-link-icon" />
            {{ editLink.text }}
          </Link>
        </div>

        <div v-if="hasLastUpdated" class="last-updated">
          <FooterLastUpdated />
        </div>
      </div>

      <div v-if="showDocFooter" class="divider" />

      <nav v-if="control.prev?.link || control.next?.link" class="prev-next" aria-labelledby="doc-footer-aria-label">
        <span class="visually-hidden" id="doc-footer-aria-label">Pager</span>

        <div class="pager">
          <Link v-if="control.prev?.link" class="pager-link prev" :href="control.prev.link">
            <span class="desc" v-html="theme.docFooter?.prev || 'Previous page'"></span>
            <span class="title" v-html="control.prev.text"></span>
          </Link>
        </div>
        <div class="pager">
          <Link v-if="control.next?.link" class="pager-link next" :href="control.next.link">
            <span class="desc" v-html="theme.docFooter?.next || 'Next page'"></span>
            <span class="title" v-html="control.next.text"></span>
          </Link>
        </div>
      </nav>

      <div v-if="!showDocFooter && theme.footer" class="container">
        <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
        <p v-if="theme.footer.copyright" class="copyright" v-html="theme.footer.copyright"></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.Footer {
  position: relative;
  margin-top: v-bind("marginTop.mobile");
  z-index: var(--vp-z-index-footer);
  transition: background-color 0.25s !important;
}

.Footer :deep(a:hover) {
  transition: color 0.25s !important;
  color: var(--vp-c-text-1);
}

.Footer .vp-container {
  flex-direction: column;
  padding-block: 16px;
  row-gap: 16px;
}

@media (min-width: 768px) {
  .Footer {
    margin-top: v-bind("marginTop.desktop");
  }

  .Footer .vp-container {
    padding-block: 24px;
  }
}

@media (min-width: 960px) {
  .Footer .vp-container {
    padding-block: 32px;
  }
}

@media (max-width: 959px) {
  .Footer .vp-container {
    padding-inline: v-bind("paddingInline.lg");
  }
}

@media (max-width: 767px) {
  .Footer .vp-container {
    padding-inline: v-bind("paddingInline.md");
  }
}

.container {
  margin: 0 auto;
  max-width: var(--vp-layout-max-width);
  text-align: center;
}

.divider {
  height: 1px;
  background-color: var(--vp-c-divider);
  transition: background-color 0.25s !important;
}

@media (min-width: 640px) {
  .edit-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.edit-link-button {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s !important;
}

.edit-link-button:hover {
  color: var(--vp-c-brand-2);
}

.edit-link-icon {
  margin-right: 8px;
}

.prev-next {
  display: grid;
  grid-row-gap: 8px;
}

@media (min-width: 640px) {
  .prev-next {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 16px;
  }
}

.pager-link {
  display: block;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s !important;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link.next {
  margin-left: auto;
  text-align: right;
}

.desc {
  display: block;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  transition: color 0.25s !important;
}

.title {
  display: block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: color 0.25s !important;
}
</style>
