<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
  <div class="fixed flex justify-center items-center inset-0 isolate">
    <div
      class="absolute opacity-50 bg-black inset-0 z-0"
      @click.stop="emit('close')"
    ></div>
    <div class="bg-white p-4 rounded-lg">
      <slot></slot>
    </div>
  </div>
</template>
