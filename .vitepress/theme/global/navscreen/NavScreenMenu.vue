<script lang="ts" setup>
import { useData } from "../../composables/data";
import NavScreenLink from "./NavScreenLink.vue";
import NavScreenMenuGroup from "./NavScreenMenuGroup.vue";

const { theme } = useData();
</script>

<template>
  <nav v-if="theme.nav" class="NavScreenMenu">
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <NavScreenLink v-if="'link' in item && !('subNav' in item)" :item type="MenuLink" />
      <NavScreenMenuGroup
        v-else-if="'link' in item && 'subNav' in item"
        :text="item.text || ''"
        :items="item.subNav ?? []"
      />
      <NavScreenMenuGroup v-else :text="item.text || ''" :items="item.items ?? []" />
    </template>
  </nav>
</template>
