<script lang="ts">
    import type { HTMLSelectAttributes } from "svelte/elements"
    import { cva, type VariantProps } from "$lib/cva.config"
    import { ExpandUpDownLineArrows } from "svelte-remix"
    import Icon from "$lib/components/icon.svelte"

    const select = cva({
        base: `rounded-md bg-neutral-100 focus:outline-none focus:ring ring-neutral-200 transition \
        appearance-none w-full cursor-pointer`,
        variants: {
            size: {
                small: "px-2 py-1",
                medium: "py-2 px-3",
            },
        },
    })

    const container = cva({
        base: `relative w-full`,
    })

    type $$Props = Omit<HTMLSelectAttributes, "size"> &
        VariantProps<typeof select> & { containerClass?: string }
    const { class: className, containerClass, ...rest } = $$restProps
    export let size: $$Props["size"] = "medium"
</script>

<div class={container({ className: containerClass })}>
    <select class={select({ className, size })} {...rest} on:change>
        <slot />
    </select>
    <Icon
        icon={ExpandUpDownLineArrows}
        class="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none text-neutral-500"
    />
</div>
