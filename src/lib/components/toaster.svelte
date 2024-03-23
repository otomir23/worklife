<script lang="ts">
    import Toast from "$lib/components/toast.svelte"
    import { toasts } from "$lib/data/toaster"
</script>

<div class="flex flex-col gap-1 fixed top-2 left-1/2 -translate-x-1/2 z-50">
    {#each $toasts as { message, id } (id)}
        <Toast {message} />
    {/each}
</div>
