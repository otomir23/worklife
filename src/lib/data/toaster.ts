import { writable } from "svelte/store"

const timeout = 3000
export type Toast = { message: string; id: number }
export const toasts = writable<Toast[]>([])

export function toast(message: string) {
    const id = Math.floor(Math.random() * 10000)
    toasts.update((p) => [{ id, message }, ...p])
    setTimeout(() => toasts.update((p) => p.filter((t) => t.id !== id)), timeout)
}
