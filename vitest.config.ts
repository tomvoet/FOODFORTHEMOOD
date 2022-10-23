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
        setupFiles: ["./tests/setupTestUtils.ts"],
    },
})
