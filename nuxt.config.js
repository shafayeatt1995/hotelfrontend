export default {
  ssr: process.env.MODE === "universal" ? true : false, //universal / spa
  target: process.env.TARGET ?? "server", // static / server
  generate: { interval: 200 },
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 8080,
  },

  head: {
    htmlAttrs: { lang: "en" },
    title: process.env.APP_NAME || "ColoZai",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-adsense-account", content: "ca-pub-4198613489910321" },
      {
        name: "google-site-verification",
        content: "mfkpXWF7Li7GQaM0sHoymIiieIEARIXGCfddV5jtGnY",
      },
      {
        property: "og:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      { property: "og:site_name", content: `Colozai` },
      { property: "og:url", content: `https://www.colozai.com` },
      { property: "og:type", content: `website` },
      {
        name: "twitter:image",
        content: `${process.env.BASE_URL}/og-image.webp`,
      },
      { name: "twitter:card", content: `summary_large_image` },
      { name: "robots", content: `max-image-preview:large` },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Kaushan+Script&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
      },
    ],
    script: [
      {
        type: "text/javascript",
        src: `/js/gtag.js`,
        head: true,
      },
      {
        type: "text/javascript",
        src: `/js/clearity.js`,
        head: true,
      },
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-GDBWZXY0BG",
        async: true,
        defer: true,
        body: true,
      },
      {
        type: "text/javascript",
        src: `/js/analytics.js`,
        body: true,
      },
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4198613489910321",
        async: true,
        crossorigin: "anonymous",
        head: true,
      },
    ],
  },

  css: ["@/assets/css/main.scss"],

  plugins: [
    "@/plugins/global-variable.js",
    "@/plugins/api.js",
    "@/plugins/filter.js",
    "@/plugins/slide.js",
    "@/plugins/domPurify.js",
    { src: "@/plugins/toast.js", mode: "client" },
    { src: "@/plugins/datePicker.js", mode: "client" },
    { src: "@/plugins/carousel.js", mode: "client" },
    { src: "@/plugins/apexChart.js", mode: "client" },
    { src: "@/plugins/tooltip.js", mode: "client" },
    // { src: "@/plugins/firebase.js", mode: "client" },
    { src: "@/plugins/viewer.js", mode: "client" },
    { src: "@/plugins/editor.js", mode: "client" },
    { src: "@/plugins/gtag.js", mode: "client" },
  ],

  components: true,

  buildModules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/dotenv",
    "@/modules/generator",
    "@nuxt/image",
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "nuxt-svg-loader",
    "@nuxtjs/sitemap",
  ],

  image: {
    provider: "static",
    staticFilename: "images/[name][ext]",
    domains: ["utfs.io", "lh3.googleusercontent.com"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },

  sitemap: {
    hostname: "https://www.colozai.com",
    path: "/sitemap.xml",
    gzip: true,
    exclude: ["/dashboard/**"],
    defaults: { changefreq: "daily", priority: 1, lastmod: new Date() },
  },

  axios: { proxy: true, baseURL: process.env.API_URL },

  auth: {
    strategies: {
      cookie: {
        provider: "laravel/jwt",
        scheme: "refresh",
        url: `${process.env.API_URL}/api/`,
        endpoints: {
          login: { url: "auth/login", method: "post" },
          logout: { url: "auth/logout", method: "get" },
          refresh: { url: "user/refresh", method: "post" },
          user: { url: "user/profile", method: "get" },
        },
        autoLogout: true,
        user: { property: "user" },
        token: {
          property: "token",
          maxAge: 60 * 60 * 24 * 7,
          global: true,
          type: "Bearer",
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
          maxAge: 60 * 60 * 24 * 7,
        },
      },
    },
    redirect: {
      home: "/",
      logout: "/login",
      login: "/login",
      callback: "/login",
    },
  },

  router: { middleware: ["auth", "errorHandler"] },

  build: {
    analyze: !!process.env.ANALYZE,
    extend(config, ctx) {
      if (ctx.isClient) {
        config.devtool = "source-map";
      }
    },
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    extractCSS: true,
  },
};
