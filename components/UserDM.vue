<script setup lang="ts">
const textArea = ref<HTMLTextAreaElement | null>(null);
const input = ref("");
const inputPresets = [
  "Hello there! Nice to meet you, may I know your email address?",
  "Perfect! Drop me a message and I'll get back to you as soon as possible.",
  "You'll receive a reply via mail within 72 hours. Thank you for your patience!",
];

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

onMounted(() => {
  const currentLength = messages.value.length;
  messages.value.push({
    sent: false,
    message: inputPresets[0],
    loading: true,
  });
  setTimeout(() => {
    messageReceivedAudio.play();
    messages.value[currentLength].loading = false;
  }, 1500);
});

async function handleMessageSend() {
  const text = input.value;
  input.value = "";
  if (!body.email) {
    handleEmailBody(text);
  } else {
    handleMessageBody(text);
  }
}

function handleEmailBody(text: string) {
  messages.value.push({
    sent: true,
    message: text,
    loading: false,
  });
  body.email = text;
  messageSentAudio.play();
}

function handleMessageBody(text: string) {
  messages.value.push({
    sent: true,
    message: text,
    loading: false,
  });
  body.message = text;
  messageSentAudio.play();
}
</script>

<template>
  <div class="w-[320px] aspect-[1/1.25] max-h-[80vh] flex flex-col gap-2">
    <div class="flex-grow flex flex-col h-full overflow-hidden">
      <h2 class="font-[500] text-[0.75rem]">Messages</h2>
      <div
        class="rounded flex-grow flex flex-col gap-2 border border-gray-300 border-solid overflow-y-auto p-2"
      >
        <div
          class="rounded-[1.5rem] px-4 py-2 w-max max-w-[70%] text-[0.875rem]"
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
        <img src="~/assets/images/icons/send-white.svg" class="h-7" />
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
