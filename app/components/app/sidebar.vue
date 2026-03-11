<template>
  <div class="fixed top-6 left-6 z-30 hidden min-h-screen w-62 flex-col justify-between 2xl:flex">
    <div class="flex flex-col gap-2">
      <UButton
        icon="i-heroicons-plus"
        label="New Chat"
        variant="subtle"
        color="neutral"
        block
        class="mb-2 cursor-pointer!"
        @click="navigateTo('/chat')"
      />
      <ChatList />
    </div>
    <div class="relative bottom-9">
      <AppUser :show-logout="false" />
    </div>
  </div>
</template>
