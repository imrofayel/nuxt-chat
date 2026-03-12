<script lang="ts" setup>
import { computed, ref, onUnmounted, watch } from "vue";
import type { UIMessage } from "ai";
import { AnimatePresence, Motion } from "motion-v";

const props = defineProps<{
  messages: UIMessage[];
  streaming: boolean;
}>();

const emit = defineEmits<{
  "message:regenerate": [messageId: string];
}>();

type AnyPart = UIMessage["parts"][number];
type WebResult = { title?: string; url?: string; snippet?: string; text?: string };
type LinkItem = { title: string; url: string; domain: string };

type WebSearchToolPart = AnyPart & {
  type: "tool-webSearch";
  state?:
    | "input-streaming"
    | "input-available"
    | "approval-requested"
    | "approval-responded"
    | "output-available"
    | "output-error"
    | "output-denied";
  input?: { query?: string };
  output?: { results?: WebResult[] } | WebResult[];
  errorText?: string;
};

const getText = (message: UIMessage) =>
  message.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text)
    .join("");

const getToolParts = (message: UIMessage) =>
  message.parts.filter((p) => String(p.type).startsWith("tool-"));

const isWebSearchPart = (part: AnyPart): part is WebSearchToolPart =>
  part.type === "tool-webSearch";

const getWebResults = (part: WebSearchToolPart): WebResult[] => {
  if (!part.output) return [];
  if (Array.isArray(part.output)) return part.output;
  return part.output.results ?? [];
};

const toDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const getFaviconUrl = (domain: string) =>
  `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=256`;

const getMessageLinks = (message: UIMessage): LinkItem[] => {
  const seen = new Set<string>();
  const links: LinkItem[] = [];

  for (const part of getToolParts(message)) {
    if (!isWebSearchPart(part)) continue;
    for (const r of getWebResults(part)) {
      const url = (r.url || "").trim();
      if (!url || seen.has(url)) continue;
      seen.add(url);

      const domain = toDomain(url);
      links.push({
        title: (r.title || domain || url).trim(),
        url,
        domain,
      });
    }
  }

  return links;
};

const openSourcesByMessageId = ref<Record<string, boolean>>({});

const isSourcesOpen = (messageId: string) => Boolean(openSourcesByMessageId.value[messageId]);

const toggleSources = (messageId: string) => {
  openSourcesByMessageId.value[messageId] = !openSourcesByMessageId.value[messageId];
};

const phrases = ["Agent is thinking...", "Searching the web...", "Reading sources..."];
const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval>;

const lastAssistantMessage = computed(() =>
  [...props.messages].reverse().find((m) => m.role === "assistant"),
);

const lastAssistantMessageId = computed(() => lastAssistantMessage.value?.id ?? "");

const streamingLinks = computed(() =>
  lastAssistantMessage.value ? getMessageLinks(lastAssistantMessage.value) : [],
);

const currentStreamingLink = computed(() => {
  const links = streamingLinks.value;
  if (!links.length) return null;
  return links[currentIndex.value % links.length] || null;
});

const currentStreamingLabel = computed(() => {
  if (currentStreamingLink.value) {
    return `Reading now: ${currentStreamingLink.value.title}`;
  }
  return phrases[currentIndex.value % phrases.length] || "";
});

watch(
  () => props.streaming,
  (streaming) => {
    clearInterval(intervalId);
    currentIndex.value = 0;

    if (streaming) {
      intervalId = setInterval(() => {
        const cycleSize = streamingLinks.value.length || phrases.length;
        currentIndex.value = (currentIndex.value + 1) % cycleSize;
      }, 1400);
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

      <div v-else class="mb-4 space-y-2">
        <AnimatePresence v-if="props.streaming && idx === props.messages.length - 1" mode="wait">
          <Motion
            :key="`${currentIndex}-${currentStreamingLabel}`"
            :initial="{ opacity: 0, y: 10 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: -10 }"
            :transition="{ duration: 0.25 }"
            class="flex flex-wrap items-center gap-2"
          >
            <ShimmeringText :text="currentStreamingLabel" :repeat="true" :start-on-view="false" />
          </Motion>
        </AnimatePresence>

        <MDC
          v-if="getText(message)"
          :key="`mdc-${message.id}-${props.messages.length}`"
          :value="getText(message)"
          tag="article"
        />

        <ChatMessageActions
          :text="getText(message)"
          :show-regenerate="message.role === 'assistant' && message.id === lastAssistantMessageId"
          :disable-regenerate="props.streaming"
          @message:regenerate="emit('message:regenerate', message.id)"
        />

        <UButton
          v-if="getMessageLinks(message).length"
          variant="subtle"
          color="neutral"
          class="mb-2 max-w-fit"
          @click="toggleSources(message.id)"
        >
          <template #default>
            <span class="inline-flex items-center gap-2 text-[15.5px] font-normal">
              <span class="inline-flex -space-x-1">
                <img
                  v-for="(link, previewIdx) in getMessageLinks(message).slice(0, 3)"
                  :key="`${message.id}-preview-${previewIdx}`"
                  :src="getFaviconUrl(link.domain)"
                  :alt="`${link.domain} favicon`"
                  class="h-4 w-4 rounded-full bg-default ring-2 ring-default"
                  loading="lazy"
                />
              </span>
              <span>Sources</span>
            </span>
          </template>
        </UButton>

        <div
          v-if="!props.streaming && isSourcesOpen(message.id) && getMessageLinks(message).length"
          class="mt-2 flex flex-col gap-2"
        >
          <a
            v-for="(link, linkIdx) in getMessageLinks(message)"
            :key="`${message.id}-source-${linkIdx}`"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex max-w-fit items-center gap-2 rounded-md bg-elevated px-2.5 py-1.5 text-sm ring ring-accented ring-inset hover:bg-default"
          >
            <img
              v-if="link.domain"
              :src="getFaviconUrl(link.domain)"
              :alt="`${link.domain} favicon`"
              class="h-4 w-4"
              loading="lazy"
            />
            <span class="line-clamp-1 max-w-full">{{ link.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
