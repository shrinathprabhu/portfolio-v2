<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import "~/assets/css/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const route = useRoute();
const router = useRouter();
const selectedWorkIndex = computed(() =>
  UserWorks.findIndex((work) => work.id === route.params.id)
);
const totalWorksLength = computed(() => UserWorks.length);
const isLiked = ref(false);
const likeClicked = ref(false);
const selectedWork = computed(() => UserWorks[selectedWorkIndex.value]);
const LikeStorageKey = `shrinath__work-${route.params.id}-is-liked`;
const totalLikes = ref(0);
const analytics = useAnalytics();

definePageMeta({
  pageTransition: false,
  layoutTransition: false,
});

onBeforeMount(async () => {
  if (selectedWorkIndex.value === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found",
    });
  }
  const { data, pending } = await useFetch(ApiEndpoints.likes.get.url, {
    query: { work: route.params.id },
  });
  const dataInterval = setInterval(() => {
    if (!pending.value && data.value) {
      const parsedData = JSON.parse(data.value as string);
      totalLikes.value =
        parsedData.likes && parsedData.likes > -1 ? parsedData.likes : 0;
      clearInterval(dataInterval);
    }
  }, 50);
  if (process.client) {
    const likeStatus = localStorage.getItem(LikeStorageKey);
    if (likeStatus === "true") {
      isLiked.value = true;
      if (totalLikes.value <= 0) {
        totalLikes.value = 1;
      }
    }
  }
});

function nextWork() {
  router.push({
    name: "works-id",
    params: { id: UserWorks[selectedWorkIndex.value + 1].id },
  });
}

function prevWork() {
  router.push({
    name: "works-id",
    params: { id: UserWorks[selectedWorkIndex.value - 1].id },
  });
}

const handleKeyEvents = (ev: KeyboardEvent) => {
  if (
    ev.key === "ArrowRight" &&
    selectedWorkIndex.value < totalWorksLength.value - 1
  ) {
    analytics.value?.sendEvent("keyboard arrow click", {
      key: "ArrowRight",
    });
    nextWork();
  }
  if (ev.key === "ArrowLeft" && selectedWorkIndex.value > 0) {
    analytics.value?.sendEvent("keyboard arrow click", {
      key: "ArrowLeft",
    });
    prevWork();
  }
};

onMounted(() => {
  window.addEventListener("keyup", handleKeyEvents);
});

onBeforeUnmount(() => {
  window.removeEventListener("keyup", handleKeyEvents);
});

async function handleLike() {
  likeClicked.value = true;
  isLiked.value = !isLiked.value;
  analytics.value?.sendEvent("like click", {
    isLiked: isLiked.value ? 1 : 0,
  });
  if (isLiked.value) {
    totalLikes.value += 1;
    new Audio("/sounds/like.mp3").play();
  } else {
    if (totalLikes.value < 1) {
      totalLikes.value = 0;
    } else {
      totalLikes.value -= 1;
    }
    new Audio("/sounds/unlike.mp3").play();
  }
  if (process.client) {
    useFetch(ApiEndpoints.likes.post.url, {
      method: "POST",
      body: JSON.stringify({
        work: route.params.id,
        like: isLiked.value,
      }),
    });
    localStorage.setItem(LikeStorageKey, isLiked.value.toString());
  }
}

function trackProfileClick() {
  analytics.value?.sendEvent("profile click");
}
</script>

<template>
  <div class="s__container h-full md:max-h-[40rem]">
    <div
      class="border border-solid border-gray-200 rounded-md flex max-md:flex-col overflow-hidden p-1 md:my-2 h-full"
    >
      <div
        class="bg-black rounded flex-grow h-full relative md:w-[55%] border border-solid border-gray-200 overflow-hidden flex items-center justify-center overflow-hidden select-none"
      >
        <Carousel class="h-full w-full relative">
          <Slide
            v-for="media in selectedWork.media"
            :key="media.src"
            class="h-full w-full"
          >
            <NuxtImg
              :src="media.src"
              :alt="selectedWork.caption"
              format="avif"
              class="object-cover object-center h-full"
            />
          </Slide>
          <template #addons>
            <Navigation />
            <Pagination v-if="selectedWork.media.length > 1" />
          </template>
        </Carousel>
      </div>
      <div class="flex-grow flex flex-col gap-2 h-full p-3 md:w-[45%]">
        <NuxtLink
          aria-label="View profile"
          :to="{ name: 'index' }"
          class="h-10 flex gap-2 items-center rounded-md"
          @click.stop="trackProfileClick"
        >
          <div class="relative z-10 h-8 aspect-square isolate">
            <div
              class="relative rounded-full h-8 z-10 aspect-square overflow-hidden"
            >
              <img
                alt="profile-picture"
                class="object-cover object-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                :src="UserConstants.picture"
              />
            </div>
            <div
              class="absolute -inset-[1px] bg-white opacity-60 backdrop-blur-sm z-0 rounded-full"
            ></div>
            <div
              class="absolute -inset-[2px] s__instagram-gradient -z-10 rounded-full"
            ></div>
          </div>
          <div class="flex flex-col">
            <div class="flex gap-2 items-center">
              <h2 class="font-semibold text-[0.875rem] flex gap-2 items-center">
                {{ UserConstants.username }}
              </h2>
              <img
                alt="verified-icon"
                src="~/assets/images/icons/blue-tick.svg"
                class="h-[1rem]"
              />
            </div>
            <span class="text-[0.75rem]">{{ selectedWork.title }}</span>
          </div>
        </NuxtLink>
        <hr
          class="border-gray-200 border-0 border-b rounded-md h-4 -mt-4 -ml-3 -mr-4"
        />
        <div class="flex-grow flex flex-col gap-4">
          <p class="text-[0.875rem]">
            <span class="font-[500]">{{ selectedWork.title }}: </span
            >{{ selectedWork.caption }}
          </p>
          <p class="text-[0.875rem]">
            <span class="font-[500]">Website: </span>
            <NuxtLink
              aria-label="View website"
              :to="selectedWork.website"
              external
              target="_blank"
              class="text-[#3897f0]"
              >{{ selectedWork.website }}</NuxtLink
            >
          </p>
          <div class="text-[0.875rem]">
            <span class="font-[500]">Roles: </span>
            <ol class="flex flex-col gap-2 mt-1">
              <li
                v-for="designation in selectedWork.designations"
                :key="JSON.stringify(designation)"
                class="flex flex-col"
              >
                <span class="font-[400]">{{ designation.title }}</span>
                <span class="font-[300] text-[0.75rem]"
                  ><span v-if="!designation.date_ended">Since </span
                  ><span>{{ designation.date_started }}</span
                  ><span v-if="designation.date_ended">
                    - {{ designation.date_ended }}</span
                  >
                </span>
              </li>
            </ol>
          </div>
          <span class="mt-auto text-gray-600 font-[300] text-[0.75rem]">
            <span v-if="!selectedWork.date_ended">Since </span
            ><span>{{ selectedWork.date_started }}</span
            ><span v-if="selectedWork.date_ended">
              - {{ selectedWork.date_ended }}</span
            >
          </span>
        </div>
        <hr
          class="border-gray-200 border-0 border-b rounded-md h-4 -mt-4 -ml-3 -mr-4"
        />
        <div class="flex gap-2 items-center">
          <button @click="handleLike">
            <LikeSVG
              :stroke="isLiked ? '#ff3040' : '#9ca3af'"
              :fill="isLiked ? '#ff3040' : 'none'"
              height="28"
              width="28"
              :class="{
                'animate-interact': isLiked,
                'animate-shake': !isLiked && likeClicked,
              }"
            />
          </button>
          <span class="font-[500] text-[0.875rem]">{{ totalLikes }} likes</span>
        </div>
      </div>
    </div>
    <div
      v-if="selectedWorkIndex > 0"
      class="fixed left-4 top-0 bottom-0 w-8 flex flex-col justify-center items-center z-[100]"
    >
      <button
        class="bg-white rounded-full shadow border border-solid border-gray-200"
        @click.stop="prevWork"
      >
        <img
          alt="arrow-left-icon"
          src="~/assets/images/icons/arrow-left.svg"
          class="w-8"
        />
      </button>
    </div>
    <div
      v-if="selectedWorkIndex < totalWorksLength - 1"
      class="fixed right-4 top-0 bottom-0 w-8 flex flex-col justify-center items-center z-[100]"
    >
      <button
        class="bg-white rounded-full shadow border border-solid border-gray-200"
        @click.stop="nextWork"
      >
        <img
          alt="arrow-right-icon"
          src="~/assets/images/icons/arrow-right.svg"
          class="w-8"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-interact {
  animation: interact 0.2s ease-in-out;
}

.animate-shake {
  animation: shake 0.2s ease-in-out;
}

@keyframes interact {
  0% {
    scale: 1;
    filter: none;
  }
  50% {
    scale: 1.25;
    filter: blur(0.05rem);
  }
  100% {
    scale: 1;
    filter: none;
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-0.25rem);
  }
  50% {
    transform: translateX(0.25rem);
  }
  75% {
    transform: translateX(-0.25rem);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
