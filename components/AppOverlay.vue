<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed flex justify-center items-center inset-0 isolate z-[999999]"
  >
    <div
      class="absolute backdrop-blur bg-[#00000080] inset-0 z-0"
      @click.stop="emit('close')"
    ></div>
    <div class="relative bg-white p-4 rounded-md z-10">
      <button
        class="absolute right-1 top-1"
        @click.stop="emit('close')"
        title="Close"
      >
        <img src="~/assets/images/icons/cross.svg" class="w-5 h-5" />
      </button>
      <slot></slot>
    </div>
  </div>
</template>
