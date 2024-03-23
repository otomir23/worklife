<script lang="ts">
    import type { HTMLButtonAttributes } from "svelte/elements"
    import { cva, type VariantProps } from "$lib/cva.config"
    import type { ComponentType } from "svelte"
    import Icon from "$lib/components/icon.svelte"

    const button = cva({
        base: `text-sm flex items-center gap-1 focus:outline-none underline transition-all outline-none \
        font-medium decoration-transparent hover:decoration-current focus-visible:decoration-current`,
    })

    type $$Props = HTMLButtonAttributes & VariantProps<typeof button> & { icon: ComponentType }
    const { class: className, ...rest } = $$restProps

    export let icon: ComponentType
</script>

<button class={button({ className })} {...rest} on:click>
    <Icon {icon} size={16} />
    <slot /> -->
</button>
