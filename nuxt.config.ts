// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxtjs/tailwindcss"],
  content: {},
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },
  image: {
    formats: ["webp", "avif"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
    provider: "netlify",
  },
  css: [
    "~/assets/css/reset.css",
    "~/assets/css/gradient.css",
    "~/assets/css/container.css",
    "~/assets/css/transition.css",
  ],
  routeRules: {
    "/**": {
      headers: {
        "X-Frame-Options": "DENY",
        "Content-Security-Policy": `frame-ancestors 'none'; script-src 'self' 'unsafe-inline' *.shrinath.me; style-src 'self' 'unsafe-inline' *.shrinath.me; img-src 'self' data: https:; font-src 'self' data:; object-src 'none'; frame-src https://app.useoutline.xyz http://localhost:3000`,
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "origin",
      },
    },
  },
  runtimeConfig: {
    dbConnUri: "",
    smtpUser: "",
    smtpPass: "",
    smtpHost: "",
    smtpPort: "",
    public: {
      outlineAnalyticsId: "",
    },
  },
});
