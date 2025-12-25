// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/google-fonts",
    "shadcn-nuxt",
  ],
  googleFonts: {
    families: {
      Lato: {
        wght: [300, 400, 700, 900],
      },
      Roboto: {
        wght: [300, 400, 700, 900],
      },
    },
    display: "swap",
  },
  css: ["./assets/css/main.css"],
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_BASEURL,
    },
  },
});
