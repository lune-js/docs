<script lang="ts" setup>
import VPSocialLinks from "../../components/VPSocialLinks.vue";
import { useData } from "../../composables/data";

const { theme } = useData();
</script>

<template>
  <VPSocialLinks v-if="theme.socialLinks" class="NavBarSocialLinks" :links="theme.socialLinks" />
</template>

<style scoped>
.NavBarSocialLinks {
  display: none;
}

@media (min-width: 1280px) {
  .NavBarSocialLinks {
    display: flex;
    align-items: center;
  }
}
</style>
