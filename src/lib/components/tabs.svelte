<script lang="ts">
    export let choice = false
</script>

<div
    class="rounded-md bg-neutral-100 p-0.5 flex justify-around relative z-10 h-10 items-center group font-medium"
    data-choice={choice}
>
    <div
        class="absolute w-1/2 bg-white rounded-md left-0 inset-y-0 -z-10 transition border-2 shadow-sm
        group-data-[choice=true]:translate-x-full translate-x-0 ease-in-out border-neutral-100"
    />
    <button
        type="button"
        on:click={() => (choice = false)}
        class="transition text-neutral-700 group-data-[choice=false]:text-black rounded flex-1
        focus-visible:ring ring-neutral-300 focus:outline-none h-full select-none"
    >
        <slot name="first" />
    </button>
    <button
        type="button"
        on:click={() => (choice = true)}
        class="transition text-neutral-700 group-data-[choice=true]:text-black rounded flex-1
        focus-visible:ring ring-neutral-300 focus:outline-none h-full select-none"
    >
        <slot name="second" />
    </button>
</div>
