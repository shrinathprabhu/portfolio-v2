<script setup lang="ts">
import isEmail from "validator/es/lib/isEmail";

const textArea = ref<HTMLTextAreaElement | null>(null);
const chatArea = ref<HTMLDivElement | null>(null);
const input = ref("");
const inputPresets = DirectMessage.presets;
const isSubmitted = ref(false);
const analytics = useAnalytics();

type Message = {
  sent: boolean;
  message: string;
  loading: boolean;
};

const messages = ref<Message[]>([]);
const messageSentAudio = new Audio("/sounds/message-sent.mp3");
const messageReceivedAudio = new Audio("/sounds/message-received.mp3");

const body = reactive({
  email: "",
  message: "",
});

function handleInput(ev: any) {
  if (textArea.value) {
    textArea.value.rows = 1;
    if (ev.target.scrollHeight === 40) {
      textArea.value.rows = 1;
    } else if (ev.target.scrollHeight === 64) {
      textArea.value.rows = 2;
    } else if (ev.target.scrollHeight === 88) {
      textArea.value.rows = 3;
    } else {
      textArea.value.rows = 4;
    }
  }
}

function syncToLocalStorage() {
  localStorage.setItem(
    StorageKeys.chat.messages,
    JSON.stringify(messages.value)
  );
}

function getFromLocalStorage() {
  const persistedMessages = localStorage.getItem(StorageKeys.chat.messages);
  body.email = localStorage.getItem(StorageKeys.chat.email) || "";
  isSubmitted.value =
    localStorage.getItem(StorageKeys.chat.isSubmitted) === "true";
  if (persistedMessages) {
    messages.value = JSON.parse(persistedMessages);
  }
}

onMounted(() => {
  if (process.client) {
    getFromLocalStorage();
    console.log(body.email, isSubmitted.value);
    if (!isSubmitted.value) {
      console.log(body.email);
      if (!body.email) {
        pushMessage(inputPresets[0], false, 1500);
      } else {
        pushMessage(DirectMessage.welcomeBack(body.email), false, 1500);
      }
    } else {
      const totalMessages = messages.value.length;
      const lastMessage = messages.value[totalMessages - 1].message;
      if (
        lastMessage !== inputPresets[2] &&
        lastMessage !== DirectMessage.errorMessages.ALREADY_SUBMITTED &&
        lastMessage !== DirectMessage.errorMessages.ALREADY_REPLIED
      ) {
        const msg = DirectMessage.errorMessages.ALREADY_SUBMITTED;
        pushMessage(msg, false, 1500);
      }
    }
    setTimeout(() => {
      if (chatArea.value)
        chatArea.value.scrollTop = chatArea.value.scrollHeight;
    }, 100);
  }
});

function pushMessage(message: string, sent = false, timeout = 1000) {
  const loading = !sent;
  const currentLength = messages.value.length;
  messages.value.push({
    sent,
    message,
    loading,
  });
  if (process.client) {
    syncToLocalStorage();
  }
  if (sent) {
    setTimeout(() => {
      messageSentAudio.play();
    }, 250);
  }
  if (loading) {
    setTimeout(() => {
      messageReceivedAudio.play();
      messages.value[currentLength].loading = false;
      if (process.client) {
        syncToLocalStorage();
      }
    }, timeout);
  }
}

async function handleMessageSend() {
  if (!input.value.trim()) return;
  analytics.value?.sendEvent("message interaction");
  const text = input.value;
  input.value = "";
  if (textArea.value) textArea.value.rows = 1;
  if (!body.email) {
    handleEmailBody(text);
  } else {
    handleMessageBody(text);
    const { error } = await useFetch(ApiEndpoints.message.url, {
      method: ApiEndpoints.message.method,
      body: {
        email: body.email,
        message: body.message,
      },
    });
    if (error.value?.data) {
      const errorData = JSON.parse(error.value.data);
      let msg = "";
      if (errorData.code === DirectMessage.errorCodes.INVALID_INPUT) {
        msg = DirectMessage.errorMessages.INVALID_INPUT;
      } else if (
        errorData.code === DirectMessage.errorCodes.ALREADY_SUBMITTED
      ) {
        msg = DirectMessage.errorMessages.ALREADY_SUBMITTED;
        isSubmitted.value = true;
        localStorage.setItem(StorageKeys.chat.isSubmitted, "true");
      } else if (errorData.code === DirectMessage.errorCodes.ALREADY_REPLIED) {
        msg = DirectMessage.errorMessages.ALREADY_REPLIED;
      } else {
        msg = DirectMessage.errorMessages.GENERIC_ERROR;
      }
      pushMessage(msg, false);
    } else {
      pushMessage(inputPresets[2], false);
    }
  }
}

function handleEmailBody(text: string) {
  pushMessage(text, true);
  if (!isEmail(text)) {
    const msg = DirectMessage.errorMessages.INVALID_EMAIL;
    pushMessage(msg, false);
  } else {
    body.email = text;
    localStorage.setItem(StorageKeys.chat.email, body.email);
    pushMessage(inputPresets[1], false);
  }
}

function handleMessageBody(text: string) {
  pushMessage(text, true);
  body.message = text;
}
</script>

<template>
  <div class="w-[320px] aspect-[1/1.25] max-h-[80vh] flex flex-col gap-2">
    <div class="flex-grow flex flex-col h-full overflow-hidden">
      <h2 class="font-[500] text-[0.75rem]">Messages</h2>
      <div
        class="rounded flex-grow flex flex-col gap-2 border border-gray-300 border-solid overflow-y-auto p-2"
        ref="chatArea"
      >
        <div
          class="rounded-[1.5rem] px-4 py-2 w-max max-w-[80%] text-[0.875rem]"
          v-for="message in messages"
          :key="message.message"
          :class="
            message.sent ? 'bg-[#3797f0] text-white self-end' : 'bg-gray-100'
          "
        >
          <AppTypingIndicator v-if="message.loading" />
          <span v-else>{{ message.message }}</span>
        </div>
      </div>
    </div>
    <form class="flex gap-2 items-center" @submit.prevent="handleMessageSend">
      <textarea
        class="flex-grow rounded-[1.5rem] border border-gray-300 border-solid resize-none px-4 py-2"
        placeholder="Message"
        rows="1"
        ref="textArea"
        v-model="input"
        @input="handleInput"
      />
      <button
        class="rounded-full bg-blue-500 text-white p-1 s__instagram-gradient s__instagram-gradient-transition s__instagram-gradient-black"
        title="Send"
      >
        <img
          alt="send-white-icon"
          src="~/assets/images/icons/send-white.svg"
          class="h-7"
        />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
