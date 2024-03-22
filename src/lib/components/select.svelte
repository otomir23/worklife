<script lang="ts">
    import type { HTMLSelectAttributes } from "svelte/elements"
    import { cva, type VariantProps } from "$lib/cva.config"
    import { ExpandUpDownLineArrows } from "svelte-remix"
    import Icon from "$lib/components/icon.svelte"

    const select = cva({
        base: `rounded-md bg-neutral-100 focus:outline-none focus:ring ring-neutral-200 px-3 py-2 transition \
        appearance-none w-full cursor-pointer`,
    })

    type $$Props = HTMLSelectAttributes & VariantProps<typeof select>
    const { class: className, ...rest } = $$restProps
</script>

<div class="relative w-full">
    <select class={select({ className })} {...rest}>
        <slot />
    </select>
    <Icon
        icon={ExpandUpDownLineArrows}
        class="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-neutral-500"
    />
</div>
