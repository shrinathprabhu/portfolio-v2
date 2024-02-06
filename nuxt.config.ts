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
    head: {
      title:
        "Shrinath Prabhu - Frontend Lead @ Arcana | Building Outline Analytics",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        {
          name: "theme-color",
          content: "#ffffff",
        },
        {
          name: "msapplication-TileColor",
          content: "#00aba9",
        },
        {
          name: "msapplication-Config",
          content: "/favicons/browserconfig.xml",
        },
        {
          name: "title",
          content:
            "Shrinath Prabhu - Frontend Lead @ Arcana | Building Outline Analytics",
        },
        {
          name: "description",
          content:
            "Shrinath Prabhu is a Frontend Lead at Arcana (arcana.network) and the creator of Outline Analytics (useoutline.xyz).",
        },
        // Open Graph
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://shrinath.me",
        },
        {
          property: "og:title",
          content:
            "Shrinath Prabhu - Frontend Lead @ Arcana | Building Outline Analytics",
        },
        {
          property: "og:description",
          content:
            "Shrinath Prabhu is a Frontend Lead at Arcana (arcana.network) and the creator of Outline Analytics (useoutline.xyz).",
        },
        {
          property: "og:image",
          content: "/meta.png",
        },
        // Twitter
        {
          property: "twitter:card",
          content: "summary_large_image",
        },
        {
          property: "twitter:url",
          content: "https://shrinath.me",
        },
        {
          property: "twitter:title",
          content:
            "Shrinath Prabhu - Frontend Lead @ Arcana | Building Outline Analytics",
        },
        {
          property: "twitter:description",
          content:
            "Shrinath Prabhu is a Frontend Lead at Arcana (arcana.network) and the creator of Outline Analytics (useoutline.xyz).",
        },
        {
          property: "twitter:image",
          content: "/meta.png",
        },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/favicons/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicons/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/favicons/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/favicons/safari-pinned-tab.svg",
          color: "#4685ff",
        },
        {
          rel: "shortcut icon",
          href: "/favicons/favicon.ico",
        },
      ],
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
