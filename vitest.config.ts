import { defineConfig } from "vite"
import { alias } from "./alias"

export default defineConfig({
    root: ".",
    esbuild: {
        tsconfigRaw: "{}",
    },
    resolve: {
        alias,
    },
    test: {
        environment: "jsdom",
        deps: {
            inline: [/@nuxt\/test-utils-edge/],
        },
    },
})
