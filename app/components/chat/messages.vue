<script lang="ts" setup>
import { ref, onUnmounted, watch } from "vue";
import type { UIMessage } from "ai";
import { AnimatePresence, Motion } from "motion-v";

const props = defineProps<{
  messages: UIMessage[];
  streaming: boolean;
}>();

const getText = (message: UIMessage) =>
  message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

const phrases = ["Agent is thinking...", "Searching web results...", "Almost there..."];

const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval>;

watch(
  () => props.streaming,
  (streaming) => {
    clearInterval(intervalId);
    if (streaming) {
      intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % phrases.length;
      }, 1500);
    }
  },
  { immediate: true },
);

onUnmounted(() => clearInterval(intervalId));
</script>

<template>
  <div class="pb-30">
    <div v-for="(message, idx) in props.messages" :key="message.id">
      <div v-if="message.role === 'user'" class="mb-4 flex justify-end">
        <div class="max-w-[80%] rounded-lg bg-elevated px-4 py-2">
          {{ getText(message) }}
        </div>
      </div>

      <div v-else class="mb-4">
        <AnimatePresence v-if="props.streaming && idx === props.messages.length - 1" mode="wait">
          <Motion
            :key="currentIndex"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -10 }"
            :transition="{ duration: 0.3 }"
          >
            <ShimmeringText
              :text="phrases[currentIndex] || ''"
              :repeat="true"
              :start-on-view="false"
            />
          </Motion>
        </AnimatePresence>

        <MDC
          v-if="getText(message)"
          :key="`mdc-${message.id}-${props.messages.length}`"
          :value="getText(message)"
          tag="article"
        />
      </div>
    </div>
  </div>
</template>
