<template>
  <div class="flex items-center gap-2 w-max">
    <div class="ti__block">
      <div v-for="i in 3" :key="`ti__dot-${i}`" class="ti__dot" />
    </div>
    <span class="text-[0.75rem] text-gray-700"
      ><strong>Shrinath</strong> is typing</span
    >
  </div>
</template>

<style scoped>
.ti__block {
  align-items: center;
  display: flex;
  height: 16px;
}

.ti__dot {
  background-color: #9ca3af;
}

.ti__dot {
  animation: typingAnimation 1.5s infinite ease-in-out;
  border-radius: 2px;
  display: inline-block;
  height: 4px;
  margin-right: 2px;
  width: 4px;
}

@keyframes typingAnimation {
  0% {
    transform: translateY(0px);
  }
  28% {
    transform: translateY(-5px);
  }
  44% {
    transform: translateY(0px);
  }
}

.ti__dot:nth-child(1) {
  animation-delay: 200ms;
}
.ti__dot:nth-child(2) {
  animation-delay: 300ms;
}
.ti__dot:nth-child(3) {
  animation-delay: 400ms;
}
</style>
