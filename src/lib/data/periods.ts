import { z } from "zod"

export const habitPeriodSchema = z.enum(["daily", "weekly", "monthly"] as const)
export type HabitPeriod = z.infer<typeof habitPeriodSchema>

export function getPeriodBeginning(period: HabitPeriod, date: Date): Date {
    const beginning = new Date(date)
    switch (period) {
        case "daily":
            break
        case "weekly":
            beginning.setDate(beginning.getDate() - beginning.getDay())
            break
        case "monthly":
            beginning.setDate(1)
            break
    }
    beginning.setHours(0, 0, 0, 0)
    return beginning
}

export function getPeriodEnd(period: HabitPeriod, date: Date): Date {
    const beginning = getPeriodBeginning(period, date)
    const end = new Date(beginning)
    switch (period) {
        case "daily":
            end.setDate(end.getDate() + 1)
            break
        case "weekly":
            end.setDate(end.getDate() + 7)
            break
        case "monthly":
            end.setMonth(end.getMonth() + 1)
            break
    }
    return end
}

const periodNames = new Map([
    ["daily", "ежедневно"],
    ["weekly", "еженедельно"],
    ["monthly", "ежемесячно"],
])

export function getPeriodName(period: HabitPeriod): string {
    return periodNames.get(period) ?? ""
}

const periodOrder = ["daily", "weekly", "monthly"]
export function comparePeriods(a: HabitPeriod, b: HabitPeriod): number {
    return periodOrder.indexOf(a) - periodOrder.indexOf(b)
}
