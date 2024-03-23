<script lang="ts">
    import Icon from "$lib/components/icon.svelte"
    import { InformationFillSystem } from "svelte-remix"
    import { fly } from "svelte/transition"

    export let message: string
</script>

<div
    class="border border-neutral-200 bg-neutral-100 rounded-md px-4 py-2 flex gap-2 items-center
    text-neutral-900 text-sm w-fit"
    transition:fly={{ y: -64 }}
>
    <Icon icon={InformationFillSystem} size={16} />
    <span>{message}</span>
</div>
