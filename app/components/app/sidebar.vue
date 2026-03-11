<template>
  <div class="fixed top-6 left-6 z-30 hidden min-h-screen w-62 flex-col justify-between 2xl:flex">
    <div>
      <UButton
        icon="i-heroicons-plus"
        label="New Chat"
        variant="subtle"
        color="neutral"
        block
        class="mb-4"
        @click="navigateTo('/chat')"
      />
      <ChatList />
    </div>
    <div class="relative bottom-9">
      <AppUser :showLogout="false" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>
