import AutoImport from "unplugin-auto-import/vite"

import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    plugins: [
        AutoImport({
            include: [/\.vue$/, /\.vue\?vue/, /\.stories\.ts$/, /\.[tj]s$/],
            imports: [
                "vue",
                {
                    h3: [
                        "defineEventHandler",
                        "getQuery",
                        "sendError",
                        "createError",
                        "useBody",
                        "setCookie",
                        "parseCookies",
                    ],
                },
            ],
        }),
    ],
    test: {
        threads: false,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        environment: "jsdom",
        coverage: {
            enabled: true,
            lines: 90,
            functions: 90,
            branches: 90,
            all: true,
            include: [
                "assets",
                "components",
                "composables",
                "layouts",
                "middleware",
                "pages",
                "public",
                "server",
                "app.vue",
            ],
            exclude: [
                "**/*.story.vue",
                "**/*.test.ts",
                "app.vue",
                "pages/**/*.vue",
                "server/database/index.ts",
            ],
        },
        setupFiles: ["./tests/setupTestUtils.ts"],
    },
})
