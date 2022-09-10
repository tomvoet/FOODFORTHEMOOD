import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    typescript: {
        typeCheck: true,
        strict: true,
    },
    css: [
        '~/assets/css/main.css'
    ],
    buildModules: [
        '@nuxtjs/google-fonts'
    ],
    googleFonts: {
        families: {
            'Crimson Text': [400, 700],
            'Work Sans': [400, 700]
        }
    },
    nitro: {
        storage: {
        }
    },
})
