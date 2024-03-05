<script setup lang="ts">
const shareData = {
  title: "Shrinath Prabhu",
  text: "Check out Shrinath Prabhu's profile!",
  url: "https://shrinath.me",
};
const isDMOpen = ref(false);
const analytics = useAnalytics();

async function shareProfile() {
  if (canShare()) {
    try {
      await navigator.share(shareData);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("Web Share API not supported in your browser");
  }
}

function canShare() {
  if (process.client) {
    return navigator.canShare && navigator.canShare(shareData);
  }
}

function trackSocialClick(social: string) {
  analytics.value?.sendEvent("social link click", {
    social,
  });
}
</script>

<template>
  <div class="flex gap-6 mt-4 s__flex-wrap">
    <section>
      <div class="h-28 flex items-center">
        <div class="relative z-10 h-24 aspect-square isolate">
          <div
            class="relative rounded-full h-24 z-10 aspect-square overflow-hidden"
          >
            <img
              class="object-cover object-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              :src="UserConstants.picture"
            />
          </div>
          <div
            class="absolute -inset-[2px] bg-white opacity-60 backdrop-blur-sm z-0 rounded-full"
          ></div>
          <div
            class="absolute -inset-[4px] s__instagram-gradient -z-10 rounded-full"
          ></div>
        </div>
      </div>
    </section>
    <section class="flex flex-col">
      <h1 class="font-[700] text-[1.5rem] flex gap-2 items-center">
        <span>{{ UserConstants.name }}</span>
        <img src="~/assets/images/icons/blue-tick.svg" class="h-[1.25rem]" />
      </h1>
      <p class="text-[1rem] text-gray-600 font-[300]">
        {{ UserConstants.bio }}
      </p>
      <p class="text-[0.875rem] text-gray-500 flex items-center gap-[2px]">
        <img src="~/assets/images/icons/location.svg" class="h-[1.25rem]" />
        <span>{{ UserConstants.location }}</span>
      </p>
      <div class="flex gap-2 mt-3 flex-wrap">
        <button
          class="flex items-center gap-1"
          title="Feel free to message me!"
          @click.stop="
            isDMOpen = true;
            trackSocialClick('message');
          "
        >
          <span>Message</span>
          <img src="~/assets/images/icons/chat.svg" class="btn-icon" />
        </button>
        <Transition name="fade" mode="out-in">
          <AppOverlay v-if="isDMOpen" @close="isDMOpen = false">
            <UserDM />
          </AppOverlay>
        </Transition>
        <div class="flex gap-2 items-center flex-wrap">
          <NuxtLink
            :to="UserConstants.socials.twitter"
            target="_blank"
            external
            title="Follow me on X, or feel free to DM me. I'm always happy to chat!"
            @click.stop="trackSocialClick('x.com')"
          >
            <img
              src="~/assets/images/icons/twitter.svg"
              class="btn-icon-social"
            />
          </NuxtLink>
          <NuxtLink
            :to="UserConstants.socials.linkedin"
            target="_blank"
            external
            title="Let's connect on LinkedIn! We can discuss tech, life, or anything else you'd like!"
            @click.stop="trackSocialClick('linkedin')"
          >
            <img
              src="~/assets/images/icons/linkedin.svg"
              class="btn-icon-social"
            />
          </NuxtLink>
          <NuxtLink
            :to="UserConstants.socials.github"
            target="_blank"
            external
            title="Explore my work on GitHub—you might discover something useful!"
            @click.stop="trackSocialClick('github')"
          >
            <img
              src="~/assets/images/icons/github.svg"
              class="btn-icon-social"
            />
          </NuxtLink>
          <NuxtLink
            :to="UserConstants.socials.mail"
            title="Feel free to drop me an email, and we can have a chat!"
            @click.stop="trackSocialClick('mail')"
          >
            <img src="~/assets/images/icons/message.svg" />
          </NuxtLink>
          <button
            v-if="canShare()"
            @click.stop="shareProfile"
            title="Spread the digital love! Share my profile and let the virtual fireworks begin!"
          >
            <img
              src="~/assets/images/icons/send.svg"
              class="btn-icon-social"
              style="padding: 0"
            />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
button,
a {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #efefef;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.25rem;
  cursor: pointer;
  display: flex;
  transition: background-color 0.2s ease-in-out;
}

:is(button, a):is(:hover, :focus-visible) {
  background-color: #dbdbdb;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-icon-social {
  width: 1.5rem;
  height: 1.5rem;
  padding: 2px;
}

@media screen and (max-width: 480px) {
  .s__flex-wrap {
    flex-wrap: wrap;
  }
}
</style>
