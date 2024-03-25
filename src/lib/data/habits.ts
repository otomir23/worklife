import { z } from "zod"
import { getPeriodBeginning, getPeriodEnd, habitPeriodSchema } from "$lib/data/periods"
import { writable } from "svelte/store"
import { completeHabit, resetStreak } from "$lib/data/game"
import { now } from "$lib/data/time-travel"

const habitsStorageKey = "habits"
export const habits = writable<Habit[] | null>(null)

export const importedHabitActionSchema = z.object({
    id: z.number(),
    date: z.coerce.date(),
    value: z.number().optional(),
})
export const habitActionSchema = importedHabitActionSchema.omit({ id: true })
export type HabitAction = z.infer<typeof habitActionSchema>

export const importedHabitSchema = z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(),
    addDate: z.coerce.date(),
    period: habitPeriodSchema,
    targetValue: z.number().optional(),
    unit: z.string().optional(),
})
export type ImportedHabit = z.infer<typeof importedHabitSchema>
export const habitSchema = importedHabitSchema.extend({
    archivedDate: z.coerce.date().optional(),
    actions: z.array(habitActionSchema),
    currentValue: z.number().optional(),
    startedDate: z.coerce.date(),
    streak: z.number(),
})
export type Habit = z.infer<typeof habitSchema>

function saveHabits(newHabits: Habit[]) {
    localStorage.setItem(habitsStorageKey, JSON.stringify(newHabits))
    habits.set(newHabits)
}

export function getHabits(): Habit[] {
    try {
        const rawData: unknown = JSON.parse(localStorage.getItem(habitsStorageKey) ?? "[]")
        const habits = z.array(habitSchema).parse(rawData)
        const today = now()

        // Invalidate habits that are past their period end
        const newHabits = habits.map((h) => {
            if (today < getPeriodEnd(h.period, h.startedDate) || h.archivedDate !== undefined)
                // Habit is still valid
                return h

            const currentAction = h.actions.find((a) => a.date > h.startedDate)

            // If there is no action after the period start, then the habit was not done, so we reset the streak
            const shouldReset = currentAction ? false : resetStreak()

            return {
                ...h,
                currentValue: h.targetValue ? 0 : undefined,
                startedDate: getPeriodBeginning(h.period, today),
                streak: shouldReset ? 0 : h.streak,
            }
        })
        saveHabits(newHabits)
        return newHabits
    } catch (e) {
        console.error(e)
        return []
    }
}

export function syncHabits() {
    habits.set(getHabits())
}

export type HabitCreation = Omit<ImportedHabit, "id" | "addDate">
export function createHabit(habit: HabitCreation) {
    const oldHabits = getHabits()
    const maxId = Math.max(...oldHabits.map((h) => h.id), 0)
    const today = now()
    const newHabits: Habit[] = [
        ...oldHabits,
        {
            id: maxId + 1,
            addDate: today,
            actions: [],
            streak: 0,
            startedDate: getPeriodBeginning(habit.period, today),
            currentValue: habit.targetValue ? 0 : undefined,
            ...habit,
        },
    ]
    saveHabits(newHabits)
}

export function removeHabit(id: number) {
    const newHabits = getHabits().filter((h) => h.id !== id)
    saveHabits(newHabits)
}

export function archiveHabit(id: number) {
    const newHabits = getHabits().map((h) => {
        if (h.id !== id) return h
        return {
            ...h,
            archivedDate: now(),
        }
    })
    saveHabits(newHabits)
}

export function updateHabitProgress(id: number, progress: number) {
    const today = now()
    const newHabits = getHabits().map((h) => {
        if (h.id !== id || progress === 0) return h
        if (h.targetValue && progress < h.targetValue) {
            return {
                ...h,
                currentValue: h.targetValue ? progress : undefined,
            }
        }

        completeHabit()
        return {
            ...h,
            streak: h.streak + 1,
            currentValue: h.targetValue ? progress : undefined,
            actions: [
                ...h.actions,
                {
                    date: today,
                    value: h.targetValue ? progress : undefined,
                },
            ],
        }
    })
    saveHabits(newHabits)
}

export const importSchema = z.object({
    habits: z.array(importedHabitSchema),
    actions: z.array(importedHabitActionSchema),
})

export function importData(data: string) {
    try {
        const parsed = importSchema.parse(JSON.parse(data))
        const today = now()
        const newHabits = parsed.habits.map((h) => {
            const actions = parsed.actions.filter((a) => a.id === h.id)
            const currentPeriodBeginning = getPeriodBeginning(h.period, today)
            return {
                ...h,
                actions,
                startedDate: currentPeriodBeginning,
                currentValue: h.targetValue ? 0 : undefined,
                streak: 0,
            }
        })
        saveHabits(newHabits)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
