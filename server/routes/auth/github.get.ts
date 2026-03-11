const { clientId, clientSecret } = useRuntimeConfig().oauth.github;

export default defineOAuthGitHubEventHandler({
  config: {
    clientId: clientId,
    clientSecret: clientSecret,
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        githubId: user.id,
        username: user.login,
        name: user.name,
        email: user.email,
        avatar: user.avatar_url,
      },
    });
    return sendRedirect(event, "/");
  },
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
