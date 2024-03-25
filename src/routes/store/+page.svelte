<script lang="ts">
    import { game, purchaseItem, storeItems } from "$lib/data/game.js"
    import { CopperCoinFillFinance } from "svelte-remix"
    import { toast } from "$lib/data/toaster.js"
    import Button from "$lib/components/button.svelte"
    import Icon from "$lib/components/icon.svelte"
</script>

<div class="flex gap-1 items-center justify-between">
    <h1 class="font-bold text-xl">Магазин</h1>
    {#if $game === null}
        <div class="bg-neutral-200 animate-pulse h-4 w-12 rounded" />
    {:else}
        <div class="flex gap-1 items-center text-lg">
            <Icon icon={CopperCoinFillFinance} size={16} />
            <span>{$game.money}</span>
        </div>
    {/if}
</div>
{#each storeItems as item}
    <div class="border border-neutral-200 flex flex-col gap-2 p-4 rounded-lg">
        <Icon icon={item.icon} />
        <h3 class="font-bold">{item.name}</h3>
        <p>{item.description}</p>
        <Button
            size="small"
            class="w-full gap-1"
            type="button"
            on:click={() => {
                const res = purchaseItem(item)
                if (!res) toast("Недостаточно средств")
            }}
        >
            Купить за {item.price}
            <Icon icon={CopperCoinFillFinance} size={16} />
        </Button>
    </div>
{/each}
