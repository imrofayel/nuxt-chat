<template>
  <div
    class="fixed bottom-2 z-100 mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-md bg-background px-2.5 py-1 pb-2 ring ring-accented ring-inset"
  >
    <UTextarea
      :rows="1"
      class="w-full"
      placeholder="Got a thought to share?"
      autoresize
      :maxrows="8"
    />
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
      >
        Send
      </UButton>
    </div>
  </div>
</template>
