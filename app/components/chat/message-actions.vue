<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  text: string;
  showRegenerate?: boolean;
  disableRegenerate?: boolean;
}>();

const emit = defineEmits<{
  "message:regenerate": [string];
}>();

const { copy, copied, isSupported } = useClipboard();

const copyText = async () => {
  if (!props.text?.trim() || !isSupported.value) return;
  await copy(props.text);
};
</script>

<template>
  <div class="flex items-center gap-1.5 text-muted">
    <UTooltip text="Copy">
      <UButton
        variant="ghost"
        color="neutral"
        :icon="copied ? 'codicon:check' : 'codicon:copy'"
        :disabled="!isSupported"
        @click="copyText"
      />
    </UTooltip>

    <UTooltip text="Regenerate">
      <UButton
        v-if="showRegenerate"
        variant="ghost"
        color="neutral"
        icon="codicon:refresh"
        :disabled="disableRegenerate"
        @click="emit('message:regenerate', props.text)"
      />
    </UTooltip>
  </div>
</template>
