<script lang="ts">
    import { createHabit, importData, habits, syncHabits, type Habit } from "$lib/data/habits"
    import Button from "$lib/components/button.svelte"
    import LinkButton from "$lib/components/link-button.svelte"
    import Field from "$lib/components/field.svelte"
    import Input from "$lib/components/input.svelte"
    import Select from "$lib/components/select.svelte"
    import Tabs from "$lib/components/tabs.svelte"
    import Icon from "$lib/components/icon.svelte"
    import Modal from "$lib/components/modal.svelte"
    import BarChart from "$lib/components/bar-chart.svelte"
    import HabitCard from "$lib/components/habit.svelte"
    import { onMount } from "svelte"
    import {
        AddBoxFillSystem,
        CopperCoinFillFinance,
        FileList3FillDocument,
        FireFillWeather,
        Forbid2LineSystem,
        PauseCircleFillMedia,
        SpeedFillMedia,
        Store2FillBuildings,
        UploadCloud2FillSystem,
        ZzzFillHealthMedical,
    } from "svelte-remix"
    import { templates } from "$lib/data/templates"
    import { getCategoryIcon } from "$lib/data/categories"
    import { comparePeriods, getPeriodName, habitPeriodSchema } from "$lib/data/periods"
    import { experiencePerLevel, game, purchaseItem, storeItems, syncGame } from "$lib/data/game"
    import { format } from "date-fns"
    import { toast } from "$lib/data/toaster"

    let taskHasAmount: boolean

    let uploadField: HTMLInputElement

    async function uploadHandler(e: Event) {
        const input = e.target as HTMLInputElement
        if (!input.files || input.files.length === 0) return

        const file = await input.files[0].text()
        const res = importData(file)

        if (!res) {
            toast("Загруженный файл не является файлом привычек.")
        }

        input.value = ""
    }

    function habitStatSelectHandler(e: Event) {
        selectedHabitForStats =
            $habits?.find((h) => h.id === +(e.target as HTMLSelectElement).value) ?? null
    }

    let createHabitModal: Modal
    let habitTemplatesModal: Modal
    let storeModal: Modal

    $: relevantHabits =
        $habits
            ?.filter((h) => !h.actions.find((a) => a.date > h.startedDate) && !h.archivedDate)
            .sort((a, b) => comparePeriods(a.period, b.period)) ?? null
    $: doneCount = ($habits?.length ?? 0) - (relevantHabits?.length ?? 0)

    $: habitsWithAmount = $habits?.filter((h) => !!h.targetValue) ?? []
    let selectedHabitForStats: Habit | null = null

    onMount(() => {
        syncGame()
        syncHabits()
    })
</script>

{#if $game === null}
    <div class="bg-neutral-200 animate-pulse h-8 w-full rounded-md" />
{:else}
    <aside class="w-full flex flex-col gap-2">
        <div class="w-full rounded-full bg-neutral-100 h-6 overflow-hidden relative">
            <div class="absolute text-white mix-blend-difference font-bold left-2 top-0">
                {$game.level}
            </div>
            <div
                class="bg-neutral-950 transition-all h-full rounded"
                style="width: {($game.experience / experiencePerLevel) * 100}%"
            />
            <div class="absolute text-white mix-blend-difference font-bold right-2 top-0">
                {$game.level + 1}
            </div>
        </div>
        <div class="flex justify-between gap-2 text-xs w-full items-center">
            <div>
                <b>Опыт:</b>
                {$game.experience}
                <span class="text-neutral-500"> / {experiencePerLevel} для повышения</span>
            </div>
            <span
                class="font-bold mt-1 flex gap-0.5 text-xs items-center transition-colors
                    {$game.streak > 0 ? 'text-red-600' : 'text-neutral-700'}"
            >
                {#if $game.frozenUntil}
                    <Icon icon={PauseCircleFillMedia} size={12} />
                {/if}
                {#if $game.boostUntil}
                    <Icon icon={SpeedFillMedia} size={12} />
                {/if}
                <Icon icon={FireFillWeather} size={12} />
                {$game.streak} подряд
            </span>
        </div>
    </aside>
{/if}

{#if $habits === null || relevantHabits === null}
    {#each [...Array(3)] as _, i (i)}
        <div class="bg-neutral-200 animate-pulse h-20 w-full rounded-md" />
    {/each}
{:else if $habits.length === 0}
    <div class="flex flex-col gap-2">
        <Icon icon={Forbid2LineSystem} />
        <p>
            Вы пока не создали ни одной привычки.<br />
            Самое время это исправить.<br />
        </p>
        <div class="flex gap-2">
            <Button on:click={() => createHabitModal.open()} size="small">
                <Icon icon={AddBoxFillSystem} />
                Создать
            </Button>

            <input
                type="file"
                class="sr-only"
                bind:this={uploadField}
                on:change={uploadHandler}
                accept="application/json"
            />
            <Button on:click={() => uploadField.showPicker()} intent="secondary" size="small">
                <Icon icon={UploadCloud2FillSystem} />
                Импортировать
            </Button>
        </div>
    </div>
{:else if relevantHabits.length === 0}
    <div class="flex flex-col gap-2">
        <Icon icon={ZzzFillHealthMedical} />
        <p>
            Все ваши привычки выполнены.<br />
            Можете отдохнуть.<br />
        </p>
        <Button
            on:click={() => createHabitModal.open()}
            intent="secondary"
            size="small"
            class="w-fit"
        >
            <Icon icon={AddBoxFillSystem} />
            Добавить ещё
        </Button>
    </div>
{:else}
    <Button
        on:click={() => createHabitModal.open()}
        class="w-full sticky top-4 inset-x-0 z-10"
        intent="secondary"
    >
        <Icon icon={AddBoxFillSystem} />
        Добавить ещё
    </Button>
    {#each relevantHabits as habit (habit.id)}
        <HabitCard {habit} />
    {/each}
    {#if doneCount > 0}
        <span class="text-xs text-neutral-700 w-full">
            + {doneCount} выполненных привычек
        </span>
    {/if}
{/if}
<div class="relative">
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
<LinkButton
    icon={Store2FillBuildings}
    on:click={() => {
        storeModal.open()
    }}
>
    Магазин
</LinkButton>

<Modal
    title="Добавить привычку"
    bind:this={createHabitModal}
    on:submit={(e) => {
        const data = e.detail
        createHabit({
            title: String(data.get("goal")),
            category: String(data.get("category")),
            period: habitPeriodSchema.parse(String(data.get("period"))),
            targetValue: taskHasAmount ? +(data.get("amount") ?? "0") : undefined,
            unit: taskHasAmount ? String(data.get("unit")) : undefined,
        })
    }}
>
    <LinkButton
        icon={FileList3FillDocument}
        type="button"
        on:click={() => {
            habitTemplatesModal.open()
            createHabitModal.close()
        }}
    >
        Каталог привычек
    </LinkButton>
    <Field label="Привычка">
        <Input name="goal" placeholder="напр. Сделать зарядку" required />
    </Field>
    <Field label="Категория">
        <Input name="category" placeholder="напр. Спорт" required />
    </Field>
    <Tabs bind:choice={taskHasAmount}>
        <span slot="first">Обычная</span>
        <span slot="second">Количественная</span>
    </Tabs>
    {#if taskHasAmount}
        <div class="flex gap-2">
            <Field label="Отметка" class="flex-1">
                <Input
                    name="amount"
                    type="number"
                    class="w-full"
                    min={1}
                    placeholder="напр. 2"
                    required
                />
            </Field>
            <Field label="Единица" class="w-24">
                <Input name="unit" class="w-full" placeholder="раза" required />
            </Field>
        </div>
    {/if}
    <Field label="Повтор">
        <Select name="period" required>
            <option value="daily">Ежедневно</option>
            <option value="weekly">Еженедельно</option>
            <option value="monthly">Ежемесячно</option>
        </Select>
    </Field>
    <Button class="w-full">
        <Icon icon={AddBoxFillSystem} />
        Создать
    </Button>
</Modal>

<Modal title="Каталог привычек" bind:this={habitTemplatesModal}>
    {#each templates as { category, habitTemplates } (category)}
        <div class="flex flex-col gap-2">
            <h3 class="flex gap-1 font-bold items-center">
                <Icon icon={getCategoryIcon(category)} size={16} />
                {category}
            </h3>
            {#each habitTemplates as habit}
                <Button
                    class="w-full text-left"
                    intent="secondary"
                    size="small"
                    on:click={() => {
                        createHabit({
                            ...habit,
                            category,
                        })
                    }}
                >
                    {habit.title}
                    {#if habit.targetValue}
                        {habit.targetValue} {habit.unit}
                    {/if}
                    <span class="text-neutral-500">
                        {getPeriodName(habit.period)}
                    </span>
                </Button>
            {/each}
        </div>
    {/each}
</Modal>

<Modal title="Магазин" bind:this={storeModal}>
    <div class="flex gap-1 items-center">
        <span class="font-semibold">Баланс:</span>
        {#if $game === null}
            <div class="bg-neutral-200 animate-pulse h-4 w-12 rounded" />
        {:else}
            <Icon icon={CopperCoinFillFinance} size={16} />
            <span>{$game.money}</span>
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
                    else storeModal.close()
                }}
            >
                Купить за {item.price}
                <Icon icon={CopperCoinFillFinance} size={16} />
            </Button>
        </div>
    {/each}
</Modal>
