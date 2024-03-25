<script lang="ts">
    import Toast from "$lib/components/toast.svelte"
    import { toasts } from "$lib/data/toaster"
</script>

<div class="flex flex-col gap-1 fixed p-2 top-0 inset-x-0 items-center z-40">
    {#each $toasts as { message, id } (id)}
        <Toast {message} />
    {/each}
</div>
