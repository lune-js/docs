<script setup lang="ts">
import type { Sponsors } from "../../components/VPSponsors.vue";
import VPSponsors from "../../components/VPSponsors.vue";
import type { Sponsor } from "../../components/VPSponsorsGrid.vue";

defineProps<{
  tier?: string;
  size?: "xmini" | "mini" | "small";
  data: Sponsors[] | Sponsor[];
}>();
</script>

<template>
  <div class="SecondaryAsideSponsors">
    <VPSponsors mode="aside" :tier :size :data />
  </div>
</template>
