<script setup lang="ts">
import "@fontsource-variable/inter";
import useOutlineAnalytics from "@useoutline/analytics";

const config = useRuntimeConfig();

if (process.client) {
  const analytics = useAnalytics();
  const data = await useOutlineAnalytics(config.public.outlineAnalyticsId, {
    mock: import.meta.dev,
    debug: import.meta.dev,
  });
  analytics.value = data;
}
</script>

<template>
  <div class="h-screen">
    <NuxtPage />
  </div>
</template>
