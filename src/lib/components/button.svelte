<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements"
    import { cva, type VariantProps } from "$lib/cva.config"

    const button = cva({
        base: `rounded-md focus:outline-none focus:ring font-medium text-base flex gap-2 items-center \
        transition select-none`,
        variants: {
            intent: {
                primary: "bg-neutral-950 text-white ring-neutral-300",
                secondary:
                    "bg-neutral-100 text-neutral-800 border border-neutral-200 ring-neutral-50",
            },
            size: {
                small: "py-1 px-2",
                medium: "py-3 px-4",
            },
        },
    })

    type $$Props = HTMLButtonAttributes & VariantProps<typeof button>
    const { class: className, ...rest } = $$restProps
    export let intent: $$Props["intent"] = "primary"
    export let size: $$Props["size"] = "medium"
</script>

<button class={button({ intent, size, className })} {...rest} on:click>
    <slot />
</button>
