import { sveltekit } from "@sveltejs/kit/vite"
import { SvelteKitPWA } from "@vite-pwa/sveltekit"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [
        sveltekit(),
        SvelteKitPWA({
            srcDir: "./src",
            strategies: "generateSW",
            pwaAssets: {
                config: true,
            },
            manifest: {
                theme_color: "#000000",
                lang: "ru",
            },
        }),
    ],
    build: {
        rollupOptions: {
            external: ["sharp"],
        },
    },
    ssr: {
        noExternal: [/^svelte-chartjs/],
    },
})
