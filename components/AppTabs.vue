<script setup lang="ts">
const emit = defineEmits(["change"]);
const router = useRouter();
const route = useRoute();
const analytics = useAnalytics();

const activeTab = ref(AppTabs.works);
if (route.name === "index-blogs") {
  activeTab.value = AppTabs.blogs;
}

// @ts-ignore
function handleTabChange(tab: AppTabs) {
  if (activeTab.value !== tab) emit("change", { value: tab });
  activeTab.value = tab;
  analytics.value?.sendEvent("tab-changed", {
    tab: activeTab.value,
  });
  if (tab === AppTabs.works) {
    router.push({ name: "index" });
  } else {
    router.push({ name: "index-blogs" });
  }
}
</script>

<template>
  <div class="border-solid border-t border-gray-200 flex gap-12 justify-center">
    <button
      class="py-2 px-[2px] flex items-center gap-2 active:opacity-60 border-t-2 border-solid transition-all"
      :class="{
        'border-black': activeTab === AppTabs.works,
        'border-transparent': activeTab !== AppTabs.works,
      }"
      @click.stop="handleTabChange(AppTabs.works)"
    >
      <img
        src="~/assets/images/icons/works.svg"
        class="w-[1rem]"
        v-if="activeTab === AppTabs.works"
      />
      <img src="~/assets/images/icons/works-alt.svg" class="w-[1rem]" v-else />
      <span
        class="text-[0.875rem] uppercase tracking-widest font-semibold transition-all"
        :class="{ 'text-gray-400': activeTab !== AppTabs.works }"
        >Works</span
      >
    </button>
    <button
      class="py-2 px-[2px] flex items-center gap-2 active:opacity-60 border-t-2 border-solid transition-all"
      :class="{
        'border-black': activeTab === AppTabs.blogs,
        'border-transparent': activeTab !== AppTabs.blogs,
      }"
      @click.stop="handleTabChange(AppTabs.blogs)"
    >
      <img
        src="~/assets/images/icons/book-open.svg"
        class="w-[1rem]"
        v-if="activeTab === AppTabs.blogs"
      />
      <img src="~/assets/images/icons/book-close.svg" class="w-[1rem]" v-else />
      <span
        class="text-[0.875rem] uppercase tracking-widest font-semibold transition-all"
        :class="{ 'text-gray-400': activeTab !== AppTabs.blogs }"
        >Blogs</span
      >
    </button>
  </div>
</template>
