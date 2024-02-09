<template>
  <div class="flex-grow flex flex-col items-center justify-center s__container">
    <div
      class="flex flex-col items-center justify-center w-full max-w-[48rem]"
      style="gap: 1.2rem"
    >
      <h2
        class="text-center font-bold text-[2rem] lg:text-[5rem] leading-[1.2] s__instagram-gradient s__text-gradient"
      >
        Oops!<br />
        Page Not Found
      </h2>
      <p class="text-center mb-[1rem] max-w-[56rem]">
        Looks like you've reached a dead end in the digital universe.
      </p>
      <video autoplay loop preload="metadata" class="h-80 border-none">
        <source
          src="https://shrinath.me/videos/gojo-rickroll.mp4"
          type="video/mp4"
        />
        Your browser does not support the video.
      </video>
      <NuxtLink
        :to="{ name: 'index' }"
        class="font-medium s__instagram-gradient-transition s__instagram-gradient-black s__text-gradient"
        >Let's Fly Back Home!</NuxtLink
      >
    </div>
  </div>
</template>
