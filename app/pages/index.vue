<template>
  <div>
    <h1>Nuxt Auth Example</h1>

    <div v-if="loggedIn">
      <p>Welcome, {{ info.username }}!</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <button @click="login">Login to GitHub</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession();

const info = computed(() => user.value as GitHubUser);

const login = async () => {
  await navigateTo("/auth/github", { external: true });
};

const logout = async () => {
  await clear();
  await navigateTo("/");
};
</script>
