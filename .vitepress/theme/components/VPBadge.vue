<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string;
    type?: "info" | "note" | "tip" | "important" | "caution" | "warning" | "danger";
  }>(),
  {
    type: "tip"
  }
);
</script>

<template>
  <span class="VPBadge" :class="type">
    <slot>{{ text }}</slot>
  </span>
</template>

<style>
.VPBadge {
  display: inline-block;
  margin-left: 2px;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 0 10px;
  line-height: 22px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.5s !important;
  transform: translateY(-2px);
}

.VPBadge.small {
  padding: 0 6px;
  line-height: 18px;
  font-size: 10px;
  transform: translateY(-8px);
}

.VPDocFooter .VPBadge {
  display: none;
}

.vp-md h1 > .VPBadge,
.vp-md h2 > .VPBadge {
  margin: 0 0 0 2px;
  vertical-align: middle;
}

.vp-md h2 > .VPBadge {
  padding: 0 8px;
}

.vp-md h3 > .VPBadge {
  vertical-align: middle;
}

.vp-md h4 > .VPBadge,
.vp-md h5 > .VPBadge,
.vp-md h6 > .VPBadge {
  vertical-align: middle;
  line-height: 18px;
}

.VPBadge.info {
  border-color: var(--vp-badge-info-border);
  color: var(--vp-badge-info-text);
  background-color: var(--vp-badge-info-bg);
}

.VPBadge.note {
  border-color: var(--vp-badge-note-border);
  color: var(--vp-badge-note-text);
  background-color: var(--vp-badge-note-bg);
}

.VPBadge.tip {
  border-color: var(--vp-badge-tip-border);
  color: var(--vp-badge-tip-text);
  background-color: var(--vp-badge-tip-bg);
}

.VPBadge.important {
  border-color: var(--vp-badge-important-border);
  color: var(--vp-badge-important-text);
  background-color: var(--vp-badge-important-bg);
}

.VPBadge.caution {
  border-color: var(--vp-badge-caution-border);
  color: var(--vp-badge-caution-text);
  background-color: var(--vp-badge-caution-bg);
}

.VPBadge.warning {
  border-color: var(--vp-badge-warning-border);
  color: var(--vp-badge-warning-text);
  background-color: var(--vp-badge-warning-bg);
}

.VPBadge.danger {
  border-color: var(--vp-badge-danger-border);
  color: var(--vp-badge-danger-text);
  background-color: var(--vp-badge-danger-bg);
}
</style>
