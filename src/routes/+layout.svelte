<script lang="ts">
    import "../app.css"
    import { pwaInfo } from "virtual:pwa-info"
    import { pwaAssetsHead } from "virtual:pwa-assets/head"
    import { onMount } from "svelte"

    onMount(async () => {
        if (pwaInfo) {
            // Dynamically importing vite-plugin-pwa virtual module because it's client only, but SvelteKit is using SSR
            const { registerSW } = await import("virtual:pwa-register")

            registerSW({
                immediate: true,
                onRegisteredSW(_, r) {
                    if (r) {
                        setInterval(
                            () => {
                                console.log("Checking for worker update")
                                r.update()
                            },
                            // Every 15 minutes
                            15 * 60 * 1000,
                        )
                    }
                    console.log("Worker successfully registered!")
                },
                onRegisterError(error) {
                    console.error("Worker failed to register!", error)
                },
            })
        }
    })

    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : ""
</script>

<svelte:head>
    <title>Трекер полезных привычек</title>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html webManifestLink}
    {#if pwaAssetsHead.themeColor}
        <meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
    {/if}
    {#each pwaAssetsHead.links as link}
        <link {...link} />
    {/each}
</svelte:head>

<slot />
