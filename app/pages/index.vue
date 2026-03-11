<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl">Nuxt Chat</h1>

    <div class="flex max-w-fit gap-2">
      <AppUser />
      <UButton
        variant="ghost"
        color="neutral"
        class="flex cursor-pointer items-center rounded-md bg-elevated p-1.5 text-base font-normal! ring ring-accented ring-inset"
        @click="logout"
      >
        Logout
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const { logout } = useUser();
</script>
