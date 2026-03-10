<template>
  <div>
    <textarea
      ref="textarea"
      v-model="input"
      type="text"
      class="flex-1 my-auto text-[19px] bg-transparent resize-none outline-none"
      placeholder="How to assist you?"
      rows="1"
    />
  </div>
</template>

<script lang="ts" setup>
import { useTextareaAutosize } from "@vueuse/core";

const { textarea, input } = useTextareaAutosize();
</script>
