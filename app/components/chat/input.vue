<script lang="ts" setup>
defineProps<{
  contextUsage: number;
}>();

const emit = defineEmits<{
  "message:send": [value: string];
}>();

function sendMessage() {
  if (!prompt.value.trim()) return;

  emit("message:send", prompt.value);
  prompt.value = "";
}

const prompt = ref("");
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
        @keyup.enter="sendMessage"
      />
      <div class="py-1.5">
        <ContextUsage :value="contextUsage" />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-0.5">
        <ChatModelSelector />
        <UTooltip text="Attach files" :delay-duration="0">
          <UButton variant="ghost" class="relative -top-0.5 text-icon!">
            <UIcon name="codicon:file" />
          </UButton>
        </UTooltip>
      </div>
      <UButton
        variant="subtle"
        color="neutral"
        class="relative rounded-md text-small! ring ring-accented ring-inset"
        @click="sendMessage"
      >
        Send
      </UButton>
    </div>
  </div>
</template>
