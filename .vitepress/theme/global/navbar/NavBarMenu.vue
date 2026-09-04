<script lang="ts" setup>
import { useData } from "../../composables/data";
import NavBarMenuGroup from "./NavBarMenuGroup.vue";
import NavBarMenuLink from "./NavBarMenuLink.vue";

const { theme } = useData();
</script>

<template>
  <nav v-if="theme.nav" aria-labelledby="main-nav-aria-label" class="NavBarMenu">
    <span id="main-nav-aria-label" class="visually-hidden">Main Navigation</span>
    <template v-for="item in theme.nav" :key="JSON.stringify(item)">
      <NavBarMenuLink v-if="'link' in item" :item />
      <NavBarMenuGroup v-else :item />
    </template>
  </nav>
</template>

<style scoped>
.NavBarMenu {
  display: none;
}

@media (min-width: 768px) {
  .NavBarMenu {
    display: flex;
    gap: 24px;
  }
}
</style>
