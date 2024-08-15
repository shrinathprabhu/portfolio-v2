<script setup lang="ts">
import "@fontsource-variable/inter";
import useOutlineAnalytics from "@useoutline/analytics";

const config = useRuntimeConfig();

if (process.client) {
  try {
    const analytics = useAnalytics();
    const data = useOutlineAnalytics(config.public.outlineAnalyticsId, {
      mock: import.meta.dev,
      debug: import.meta.dev,
    });
    analytics.value = data;
  } catch (e) {
    // Do Nothing, don't log errors to console
  }
}
</script>

<template>
  <div class="h-screen">
    <NuxtPage />
  </div>
</template>
