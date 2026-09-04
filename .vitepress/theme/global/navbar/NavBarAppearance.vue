<script lang="ts" setup>
import { useData } from "../../composables/data";
import Switch from "../Switch.vue";

const { site } = useData();
</script>

<template>
  <div
    v-if="site.appearance && site.appearance !== 'force-dark' && site.appearance !== 'force-auto'"
    class="NavBarAppearance"
  >
    <Switch />
  </div>
</template>

<style scoped>
.NavBarAppearance {
  display: none;
}

@media (min-width: 1280px) {
  .NavBarAppearance {
    display: flex;
    align-items: center;
  }
}
</style>
