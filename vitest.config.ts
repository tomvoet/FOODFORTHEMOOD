import { defineConfig } from "vite"
import path from "path"

export default defineConfig({
    test: {
        threads: false,
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        setupFiles: ["./tests/setupTestUtils.ts"],
    },
})
