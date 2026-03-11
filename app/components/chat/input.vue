<script lang="ts" setup>
const props = defineProps<{
  contextUsage: number;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "message:send": [value: string];
}>();

const prompt = ref("");

function handleSend() {
  const text = prompt.value.trim();
  if (!text || props.disabled) return;

  emit("message:send", text);
  prompt.value = "";
}
</script>

<template>
  <div
    class="fixed bottom-2 z-100 mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-md bg-background px-2.5 py-1 pb-2 ring ring-accented ring-inset"
  >
    <div class="flex items-start justify-between gap-1.5">
      <UTextarea
        v-model="prompt"
        :rows="1"
        class="w-full"
        placeholder="Got a thought to share?"
        autoresize
        :maxrows="8"
        :disabled="disabled"
        @keydown.enter.exact.prevent="handleSend"
      />
      <div class="py-1.5">
        <ContextUsage :value="contextUsage" />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-0.5">
        <ChatModelSelector :disabled="disabled" />
      </div>
      <UButton
        variant="subtle"
        color="neutral"
        :loading="disabled"
        class="relative rounded-md text-small! ring ring-accented ring-inset"
        @click="handleSend"
      >
        Send
      </UButton>
    </div>
  </div>
</template>
