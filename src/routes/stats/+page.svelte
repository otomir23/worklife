<script lang="ts">
    import { format } from "date-fns"
    import { type Habit, habits } from "$lib/data/habits"
    import BarChart from "$lib/components/bar-chart.svelte"
    import Select from "$lib/components/select.svelte"

    $: habitsWithAmount = $habits?.filter((h) => !!h.targetValue) ?? []
    let selectedHabitForStats: Habit | null = null

    function habitStatSelectHandler(e: Event) {
        selectedHabitForStats =
            $habits?.find((h) => h.id === +(e.target as HTMLSelectElement).value) ?? null
    }
</script>

<h1 class="font-bold text-xl">Статистика по количественным привычкам</h1>
<div class="relative h-96">
    <Select
        containerClass="absolute inset-x-2 top-2 w-auto"
        size="small"
        on:change={habitStatSelectHandler}
    >
        <option value="">-- Выберите привычку --</option>
        {#each habitsWithAmount as habit}
            <option value={habit.id}>{habit.title}</option>
        {/each}
    </Select>
    <BarChart
        data={{
            labels: selectedHabitForStats?.actions.map((a) => format(a.date, "dd.MM.yyyy")),
            datasets: [
                {
                    label: `Выполнено (${selectedHabitForStats?.unit ?? "ед"})`,
                    data: selectedHabitForStats?.actions.map((a) => a.value ?? 0) ?? [],
                },
            ],
        }}
        line={selectedHabitForStats?.targetValue ?? 0}
    />
</div>
