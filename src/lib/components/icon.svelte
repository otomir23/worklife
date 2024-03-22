<script lang="ts">
    import type { ComponentType } from "svelte"
    import { Icon } from "svelte-remix"

    export let icon: ComponentType
    export let size: number | undefined = undefined

    let className = ""
    export { className as class }
</script>

<Icon {icon} {size} tabindex="-1" class="focus:outline-none {className}" />
