import { get, writable } from "svelte/store"
import { syncGame } from "$lib/data/game"
import { syncHabits } from "$lib/data/habits"

export const currentDateTime = writable<Date | null>(null)

export function timeTravelTo(date: Date) {
    currentDateTime.set(date)
    syncGame()
    syncHabits()
}

export function now() {
    return get(currentDateTime) ?? new Date()
}
