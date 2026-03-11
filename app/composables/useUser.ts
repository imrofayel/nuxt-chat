export const useUser = () => {
  const { loggedIn, user, clear } = useUserSession();

  const info = computed(() => (loggedIn.value ? (user.value as GitHubUser) : null));

  async function login() {
    await navigateTo("/auth/github", { external: true });
  }

  async function logout() {
    await clear();
    await navigateTo("/");
  }

  return { info, login, logout };
};
