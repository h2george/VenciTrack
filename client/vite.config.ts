import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async ({ mode }) => {
    // Puerto ESTÁTICO definido en PORTS.md
    const port = 3006;

    return {
        root: "./",
        plugins: [react()],
        envDir: "..", // Fix: Load .env from root
        base: "/", // Fix: Ensure absolute paths
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port,
            strictPort: true, // Fail if port is occupied (no auto-search)
            proxy: {
                "/api": {
                    target: process.env.VITE_API_URL || "http://localhost:3000",
                    changeOrigin: true,
                },
            },
        },
        build: {
            outDir: "../dist-web",
            emptyOutDir: true,
        },
    };
});
