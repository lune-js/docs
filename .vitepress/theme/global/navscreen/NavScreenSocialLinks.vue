<script lang="ts" setup>
import VPSocialLinks from "../../components/VPSocialLinks.vue";
import { useData } from "../../composables/data";

const { theme } = useData();
</script>

<template>
  <VPSocialLinks v-if="theme.socialLinks" class="NavScreenSocialLinks" :links="theme.socialLinks" />
</template>
