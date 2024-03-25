<script lang="ts">
    import "../app.css"
    import { pwaInfo } from "virtual:pwa-info"
    import { pwaAssetsHead } from "virtual:pwa-assets/head"
    import { onMount } from "svelte"
    import { scheduleNextNotification } from "$lib/data/notifications"
    import { page } from "$app/stores"
    import { BarChartFillBusiness, TodoFillDocument, Store2FillBuildings } from "svelte-remix"
    import { game, syncGame } from "$lib/data/game"
    import { syncHabits } from "$lib/data/habits"
    import Toaster from "$lib/components/toaster.svelte"
    import Icon from "$lib/components/icon.svelte"
    import neco from "$lib/assets/neco.png"

    const nav = [
        { icon: TodoFillDocument, text: "Привычки", href: "/" },
        { icon: BarChartFillBusiness, text: "Статистика", href: "/stats" },
        { icon: Store2FillBuildings, text: "Магазин", href: "/store" },
    ]

    onMount(async () => {
        syncGame()
        syncHabits()

        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                scheduleNextNotification()
            }
        })

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

<main
    class="selection:bg-neutral-950 selection:text-neutral-100 select-none flex flex-col gap-4 p-4
    w-full max-w-2xl mx-auto pb-24"
>
    <Toaster />
    <slot />
</main>

<nav
    class="fixed w-full md:max-w-md mx-auto md:rounded-md border-t md:border border-neutral-200
    bottom-0 inset-x-0 flex bg-neutral-50 items-center font-medium text-sm md:bottom-2 gap-1
    text-neutral-700 z-50"
>
    {#each nav as navElement}
        <a
            class="flex flex-col items-center gap-1 rounded transition p-4 flex-1
            {$page.route.id === navElement.href
                ? 'hover:bg-neutral-300 bg-neutral-200 text-black'
                : 'hover:bg-neutral-200'}"
            href={navElement.href}
        >
            <Icon icon={navElement.icon} size={16} />
            <span>{navElement.text}</span>
        </a>
    {/each}
</nav>

{#if $game?.necoArc}
    <aside
        class="flex flex-col fixed gap-2 right-2 bottom-2 w-16 pointer-events-none max-md:opacity-50
        z-50"
    >
        {#each [...Array($game.necoArc)] as _, i (i)}
            <img src={neco} alt="Неко Арк" />
        {/each}
    </aside>
{/if}
