<script lang="ts" setup>
import { computed, ref } from "vue";
import type { NavItemWithChildren } from "../../types";
import NavScreenLink from "./NavScreenLink.vue";
import NavScreenMenuGroupSection from "./NavScreenMenuGroupSection.vue";

const props = defineProps<NavItemWithChildren>();

const isOpen = ref(false);

const groupId = computed(() => `NavScreenGroup-${props.text?.replace(" ", "-").toLowerCase()}`);

function toggle() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="NavScreenMenuGroup" :class="{ open: isOpen }">
    <button class="button" :aria-controls="groupId" :aria-expanded="isOpen" @click="toggle">
      <span class="button-text" v-html="text"></span>
      <span class="vpi-plus button-icon" />
    </button>

    <div :id="groupId" class="items">
      <template v-for="item in items" :key="JSON.stringify(item)">
        <div v-if="'link' in item" class="item">
          <NavScreenLink :item type="MenuGroupLink" />
        </div>

        <div v-else class="group">
          <NavScreenMenuGroupSection :text="item.text" :items="item.items" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.NavScreenMenuGroup {
  border-bottom: 1px solid var(--vp-c-divider);
  height: 48px;
  overflow: hidden;
}

.NavScreenMenuGroup .items {
  visibility: hidden;
}

.NavScreenMenuGroup.open .items {
  visibility: visible;
}

.NavScreenMenuGroup.open {
  padding-bottom: 10px;
  height: auto;
}

.NavScreenMenuGroup.open .button {
  padding-bottom: 6px;
  color: var(--vp-c-brand-1);
}

.NavScreenMenuGroup.open .button-icon {
  /*rtl:ignore*/
  transform: rotate(45deg);
}

.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 11px 0;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.button:hover {
  color: var(--vp-c-brand-1);
}

.button-icon {
  transition: transform 0.25s;
}

.group:first-child {
  padding-top: 0px;
}

.group + .group,
.group + .item {
  padding-top: 4px;
}
</style>
