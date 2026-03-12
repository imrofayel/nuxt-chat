<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl">Nuxt Chat</h1>

    <UButton
      icon="codicon:chat-sparkle"
      label="New Chat"
      variant="subtle"
      color="neutral"
      to="/chat"
      block
      class="mb-2 h-10 cursor-pointer! text-small light:bg-transparent light:hover:bg-transparent"
    />

    <div class="flex max-w-fit gap-2">
      <AppUser :show-logout="true" />
    </div>
  </div>
</template>
