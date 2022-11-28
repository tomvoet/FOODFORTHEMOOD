// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
        strict: true,
    },
    css: ["~/assets/css/main.css"],
    nitro: {
        storage: {},
    },
    modules: [
        "@nuxt/image-edge",
        "@nuxtjs/tailwindcss",
        "@kevinmarrec/nuxt-pwa",
        "@nuxtjs/google-fonts",
        [
            "@pinia/nuxt",
            {
                autoImports: ["defineStore"],
            },
        ],
    ],
    googleFonts: {
        families: {
            Inter: true,
        },
    },
    imports: {
        dirs: ["@/stores"],
    },
    ssr: true,
    app: {
        head: {
            htmlAttrs: {
                lang: "en",
            },
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
    devServerHandlers: [],
})
