// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
        strict: true,
    },
    css: ["~/assets/css/main.css"],
    buildModules: ["@nuxtjs/google-fonts"],
    googleFonts: {
        families: {
            Inter: true,
        },
    },
    nitro: {
        storage: {},
    },
    modules: [
        "@nuxt/image-edge",
        "@nuxtjs/tailwindcss",
        "@kevinmarrec/nuxt-pwa",
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore"],
            },
        ],
    ],
    imports: {
        dirs: ["@/stores"],
    },
    ssr: true,
    head: {
        htmlAttrs: {
            lang: "en",
        },
    },
    image: {},
    pwa: {
        manifest: {
            name: "Food For The Mood",
            short_name: "F4TM",
        },
        meta: {
            name: "Food For The Mood",
            description: "Food For The Mood - The social media app for foodies",
            theme_color: "#FF7D7D",
            ogType: "website",
            ogSiteName: "Food For The Mood",
        },
    },
})
