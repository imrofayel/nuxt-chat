<template>
  <div class="w-full rounded-md bg-elevated p-1.5 ring ring-accented ring-inset">
    <div v-if="info" class="flex flex-col">
      <div class="flex items-center justify-between">
        <div class="flex cursor-pointer items-center gap-2.5 pr-3 text-base">
          <UAvatar :src="info.avatar" class="rounded-none" />
          {{ info.username }}
        </div>
      </div>
    </div>

    <div v-else>
      <UButton
        variant="ghost"
        color="neutral"
        class="flex cursor-pointer items-center gap-2 p-1! px-1.5! text-base!"
        leading-icon="codicon:github-inverted"
        @click="login"
      >
        GitHub
      </UButton>
    </div>
  </div>

  <UButton
    variant="ghost"
    color="neutral"
    v-if="info && showLogout"
    class="flex cursor-pointer items-center rounded-md bg-elevated p-1.5 text-base font-normal! ring ring-accented ring-inset"
    @click="logout"
  >
    Logout
  </UButton>
</template>

<script lang="ts" setup>
const { info, login, logout } = useUser();

defineProps<{
  showLogout: boolean;
}>();
</script>
