<script setup lang="ts">
import { UserBlogs } from "~/utils/UserBlogs";

const analytics = useAnalytics();

function capture(blogId: string) {
  analytics.value?.sendEvent("blog opened", {
    blogId,
  });
}
</script>

<template>
  <div
    v-if="!UserBlogs.length"
    class="flex-grow flex justify-center items-center"
  >
    <div class="text-center">
      <div
        class="inline-flex p-4 rounded-full border-2 border-solid border-black"
      >
        <img
          alt="book-open-icon"
          src="~/assets/images/icons/book-open.svg"
          class="w-20 h-20"
        />
      </div>
      <h2 class="mt-2 font-semibold">No blogs posted</h2>
    </div>
  </div>
  <div v-else class="mt-4 grid grid-cols-3 gap-2">
    <div
      v-for="blog in UserBlogs"
      :key="blog.id"
      class="relative bg-black aspect-square rounded-md cursor-pointer overflow-hidden border border-solid border-gray-200"
    >
      <NuxtLink
        :aria-label="`View blog at ${blog.link}`"
        class="absolute inset-0 flex items-center justify-center"
        :to="
          blog.external
            ? blog.link
            : { name: 'blogs-id', params: { id: blog.id } }
        "
        :target="blog.external ? '_blank' : '_self'"
        :external="blog.external"
        :style="blog.media[0].styles ? blog.media[0].styles : {}"
        @click.stop="capture(blog.id)"
      >
        <NuxtImg
          v-if="blog.media[0].type === 'image'"
          :src="blog.media[0].src"
          format="avif"
          :alt="blog.title"
          style="pointer-events: none"
          :style="blog.media[0].styles ? blog.media[0].styles : {}"
          class="object-cover object-center w-full"
        />
        <video
          v-else
          autoplay
          playsinline
          loop
          muted
          style="pointer-events: none"
          :style="blog.media[0].styles ? blog.media[0].styles : {}"
        >
          <source :src="blog.media[0].src" type="video/mp4" />
        </video>
      </NuxtLink>
      <div
        v-if="blog.media.length > 1"
        class="absolute top-0 right-0 p-2 opacity-90"
      >
        <img
          alt="carousel-icon"
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
