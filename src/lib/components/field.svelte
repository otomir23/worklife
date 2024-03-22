<script lang="ts">
    export let label: string = ""

    let className = ""
    export { className as class }
</script>

<label class="flex flex-col gap-2 relative {className}">
    <span class="font-bold text-sm text-nowrap">{label}</span>
    <slot />
</label>
