// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["nuxt-auth-utils", "@nuxt/eslint", "@nuxt/ui", "@nuxt/fonts", "@nuxtjs/mdc"],

  css: ["~/assets/css/main.css"],

  mdc: {
    highlight: {
      theme: {
        default: "github-light",
        dark: "github-dark",
      },
      langs: [
        "python",
        "javascript",
        "typescript",
        "bash",
        "json",
        "yaml",
        "html",
        "css",
        "vue",
        "markdown",
      ],
    },
  },

  runtimeConfig: {
    oauth: {
      github: {
        clientId: process.env.NUXT_OAUTH_GITHUB_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET,
        redirectURL: process.env.NUXT_OAUTH_GITHUB_REDIRECT_URL,
      },
    },
    ai: {
      aiGatewayApiKey: process.env.NUXT_AI_GATEWAY_API_KEY,
    },
  },
});
