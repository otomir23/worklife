<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements"
    import { cva, type VariantProps } from "$lib/cva.config"

    const input = cva({
        base: "rounded-md border border-neutral-200 focus:outline-none focus:ring ring-neutral-100 px-3 py-2 transition",
        variants: {
            type: {
                text: "",
                password: "",
                number: "",
            },
        },
        defaultVariants: {
            type: "text",
        },
    })

    type $$Props = Omit<HTMLInputAttributes, "type"> & VariantProps<typeof input>
    const { class: className, type, ...rest } = $$restProps
</script>

<input class={input({ type, className })} {type} {...rest} />
