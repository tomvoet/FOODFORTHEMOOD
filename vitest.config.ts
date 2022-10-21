//
//import { defineConfig } from "vite"
//import { alias } from "./alias"
//
//export default defineConfig({
//    root: ".",
//    esbuild: {
//        tsconfigRaw: "{}",
//    },
//    resolve: {
//        alias,
//    },
//    test: {
//        threads: false,
//        environment: "jsdom",
//        coverage: {
//            enabled: true,
//            lines: 90,
//            functions: 90,
//            branches: 90,
//            // We want to catch all js/ts/... files, not only the ones imported in some tests
//            // see https://github.com/bcoe/c8#checking-for-full-source-coverage-using---all
//            all: true,
//            include: [
//                // Nuxt 3 framework folders and files sources from directory structure here: https://v3.nuxtjs.org/guide/concepts/introduction
//                "assets",
//                "components",
//                "composables",
//                "layouts",
//                "middleware",
//                "pages",
//                "public",
//                "server",
//                "app.vue",
//            ],
//            exclude: [
//                "**/*.story.vue",
//                "**/*.test.ts",
//                "app.vue",
//                "pages/**/*.vue",
//                "server/database/index.ts",
//            ],
//        },
//        deps: {
//            inline: [/@nuxt\/test-utils/],
//        },
//        globals: true,
//
//        setupFiles: ["./tests/testSetup.ts"],
//    },
//})
//
