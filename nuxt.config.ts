// https://nuxt.com/docs/api/configuration/nuxt-config

const title =
  "Shrinath Prabhu - Frontend Engineer @ Avail | Building Outline Analytics";
const description =
  "Shrinath Prabhu is a Frontend Engineer at Avail (https://availproject.org) and the creator of Outline Analytics (https://useoutline.xyz).";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxtjs/tailwindcss"],
  content: {},
  app: {
    head: {
      title:
        "Shrinath Prabhu - Frontend Engineer @ Avail | Building Outline Analytics",
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
          content: title,
        },
        {
          name: "description",
          content: description,
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
          content: title,
        },
        {
          property: "og:description",
          content: description,
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
          content: title,
        },
        {
          property: "twitter:description",
          content: description,
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
          href: "/pfp.avif",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/pfp.avif",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/pfp.avif",
        },
        {
          rel: "manifest",
          href: "/favicons/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/pfp.avif",
          color: "#4685ff",
        },
        {
          rel: "shortcut icon",
          href: "/pfp.avif",
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
    provider: "vercel",
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
