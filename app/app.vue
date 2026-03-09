<template>
  <div>
    <h1>Nuxt Auth Example</h1>

    <div v-if="loggedIn">
      <p>Welcome, {{ displayName }}!</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login to GitHub</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

const displayName = computed(() => {
  const currentUser = user.value as Record<string, unknown> | undefined;
  return (
    (currentUser?.username as string | undefined) ||
    "GitHub User"
  );
});

const login = async () => {
  await navigateTo("/auth/github", { external: true });
};

const logout = async () => {
  await clear();
  await navigateTo("/");
};

</script>