<script lang="ts">
    import Icon from "$lib/components/icon.svelte"
    import { archiveHabit, type Habit, removeHabit, updateHabitProgress } from "$lib/data/habits"
    import { formatDistanceStrict } from "date-fns"
    import { ru as ruDateLocale } from "date-fns/locale/ru"
    import { ArchiveFillBusiness, DeleteBinFillSystem, FireFillWeather } from "svelte-remix"
    import { getCategoryIcon } from "$lib/data/categories"
    import { getPeriodEnd } from "$lib/data/periods"
    import { currentDateTime } from "$lib/data/time-travel"

    function handleChecked(e: Event) {
        if ((e.target as HTMLInputElement).checked) updateHabitProgress(habit.id, 1)
    }

    function handleNumberChange(e: Event) {
        updateHabitProgress(habit.id, +(e.target as HTMLInputElement).value ?? 0)
    }

    export let habit: Habit
</script>

<figure
    class="border border-neutral-200 w-full rounded-md px-4 py-3 flex justify-between relative group
    z-0 items-center bg-white"
>
    <figcaption class="flex flex-col">
        <span class="font-bold">{habit.title}</span>
        <span class="text-xs text-neutral-700">
            осталось
            {formatDistanceStrict(
                getPeriodEnd(habit.period, habit.startedDate),
                $currentDateTime ?? new Date(),
                {
                    locale: ruDateLocale,
                },
            )}
        </span>
        <div class="flex gap-0.5 text-xs items-center">
            <Icon icon={getCategoryIcon(habit.category)} size={12} />
            {habit.category}
        </div>
    </figcaption>
    <div class="flex gap-1 absolute top-3 left-1/2 -translate-x-1/2">
        <button
            class="focus:outline-none focus:opacity-100 group-hover:opacity-100 opacity-0 transition"
            title="Архивировать"
            on:click={() => archiveHabit(habit.id)}
        >
            <Icon icon={ArchiveFillBusiness} size={16} />
        </button>
        <button
            class="focus:outline-none focus:opacity-100 group-hover:opacity-100 opacity-0 transition"
            title="Удалить"
            on:click={() => removeHabit(habit.id)}
        >
            <Icon icon={DeleteBinFillSystem} size={16} />
        </button>
    </div>
    <div class="flex flex-col items-end">
        {#if habit.targetValue !== undefined}
            <input
                type="number"
                value={habit.currentValue}
                max={habit.targetValue}
                min={0}
                on:change={handleNumberChange}
                class="w-16 font-bold text-end appearance-none spin-button:hidden rounded-md
                focus:outline-none focus:bg-neutral-100"
            />
            <span class="text-xs text-neutral-700">
                / {habit.targetValue}
                {habit.unit ?? ""}
            </span>
        {:else}
            <input
                type="checkbox"
                class="h-6 w-6 rounded border border-neutral-300 bg-neutral-50 appearance-none
                focus:outline-none focus:ring-2 focus:ring-neutral-100 transition cursor-pointer"
                on:change={handleChecked}
            />
        {/if}
        {#if habit.streak > 0}
            <span class="text-xs text-red-600 font-bold mt-1 flex gap-0.5 items-center">
                <Icon icon={FireFillWeather} size={12} />
                {habit.streak} подряд
            </span>
        {/if}
    </div>
    <div
        class="absolute -z-10 bg-neutral-100 left-0 inset-y-0 transition-all"
        style="width: {((habit.currentValue ?? 0) / (habit.targetValue ?? 0)) * 100}%"
    />
</figure>
