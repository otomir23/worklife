<script lang="ts">
    import { CloseFillSystem } from "svelte-remix"
    import Button from "$lib/components/button.svelte"
    import Icon from "$lib/components/icon.svelte"
    import { createEventDispatcher } from "svelte"

    export let title: string
    let dialog: HTMLDialogElement

    export const open = () => dialog.showModal()
    export const close = () => dialog.close()

    const dispatch = createEventDispatcher<{ submit: FormData }>()

    function formSubmitHandler(event: Event) {
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        dispatch("submit", formData)
        form.reset()
    }
</script>

<dialog
    bind:this={dialog}
    class="w-full max-w-screen-sm sm:max-w-lg rounded-lg max-sm:mb-0 max-sm:rounded-b-none shadow-2xl select-none"
>
    <form class="flex flex-col gap-4 p-6" method="dialog" on:submit={formSubmitHandler}>
        <aside class="flex items-center justify-between">
            <h2 class="font-bold text-xl">
                {title}
            </h2>
            <Button
                intent="secondary"
                size="small"
                class="px-1"
                type="reset"
                on:click={() => dialog.close()}
            >
                <Icon icon={CloseFillSystem} />
            </Button>
        </aside>
        <slot />
    </form>
</dialog>
