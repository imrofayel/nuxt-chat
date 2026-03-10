export const useUser = () => {
  const { loggedIn, user } = useUserSession();

  const info = computed(() => (loggedIn.value ? (user.value as GitHubUser) : null));

  return { info };
};
