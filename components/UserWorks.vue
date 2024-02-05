<template>
  <div class="mt-4 grid grid-cols-3 gap-2">
    <div
      v-for="work in UserWorks"
      :key="work.id"
      class="relative bg-black aspect-square rounded-md cursor-pointer overflow-hidden border border-solid border-gray-200"
    >
      <NuxtLink
        class="absolute inset-0 flex items-center justify-center"
        :to="{ name: 'works-id', params: { id: work.id } }"
      >
        <NuxtImg
          :src="work.media[0].src"
          format="avif, webp"
          densities="x1 x2"
          class="object-cover object-center w-full"
        />
      </NuxtLink>
      <div
        v-if="work.media.length > 1"
        class="absolute top-0 right-0 p-2 opacity-90"
      >
        <img
          src="~/assets/images/icons/carousel.svg"
          class="w-6 h-6"
          style="
            filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.2))
              drop-shadow(0 2px 2px rgb(0 0 0 / 0.15));
          "
        />
      </div>
    </div>
  </div>
</template>
