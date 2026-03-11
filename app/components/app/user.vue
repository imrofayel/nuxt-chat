<template>
  <div class="relative bottom-9 w-full rounded-md bg-elevated p-1.5 ring ring-accented ring-inset">
    <div v-if="info" class="flex flex-col">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <UAvatar :src="info.avatar" class="rounded-none" />
          {{ info.name }}
        </div>
      </div>
    </div>

    <div v-else>Not logged in</div>
  </div>
</template>

<script lang="ts" setup>
const { info } = useUser();
</script>
