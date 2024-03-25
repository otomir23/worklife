import { writable } from "svelte/store"
import { z } from "zod"
import { PauseCircleFillMedia, SparklingFillWeather, SpeedFillMedia } from "svelte-remix"
import type { ComponentType } from "svelte"
import { toast } from "$lib/data/toaster"
import { now } from "$lib/data/time-travel"

const gameStorageKey = "game"

export const experiencePerLevel = 30
export const experiencePerHabit = 2
export const moneyPerLevel = 10

export const gameSchema = z.object({
    level: z.number().default(1),
    experience: z.number().default(0),
    money: z.number().default(0),
    boostUntil: z.coerce.date().optional(),
    frozenUntil: z.coerce.date().optional(),
    streak: z.number().default(0),
    necoArc: z.number().default(0),
})
export type Game = z.infer<typeof gameSchema>

export const game = writable<Game | null>(null)

export function getGame(): Game {
    const rawData: unknown = JSON.parse(localStorage.getItem(gameStorageKey) ?? "{}")
    return gameSchema.parse(rawData)
}

function saveGame(newGame: Game) {
    localStorage.setItem(gameStorageKey, JSON.stringify(newGame))
    game.set(newGame)
}

export function syncGame() {
    saveGame(getGame())
}

export function completeHabit() {
    const newGame = getGame()

    const isBoosted = newGame.boostUntil && newGame.boostUntil > now()
    const newExperience =
        newGame.experience + (isBoosted ? experiencePerHabit * 2 : experiencePerHabit)
    const levelsUp = Math.floor(newExperience / experiencePerLevel)
    const experience = newExperience % experiencePerLevel
    const moneyReward = levelsUp * moneyPerLevel

    if (levelsUp > 0)
        toast(
            `Достигнут новый уровень: ${newGame.level + levelsUp}. Получено ${moneyReward} монет.`,
        )

    saveGame({
        ...newGame,
        level: newGame.level + levelsUp,
        experience: experience,
        money: newGame.money + moneyReward,
        streak: newGame.streak + 1,
    })
}

export function resetStreak() {
    const newGame = getGame()

    const isFrozen = newGame.frozenUntil && newGame.frozenUntil > now()
    if (isFrozen) {
        toast("Вы не выполнили привычку, но ваш стрик не сброшен из-за заморозки.")
        return false
    }
    toast("Вы не выполнили привычку, стрик был сброшен.")

    saveGame({
        ...newGame,
        streak: 0,
    })

    return true
}

export type StoreItem = {
    icon: ComponentType
    name: string
    description: string
    price: number
    purchase: (prev: Game) => Partial<Game>
}

export function purchaseItem(item: StoreItem) {
    const newGame = getGame()

    if (newGame.money < item.price) return false

    saveGame({
        ...newGame,
        ...item.purchase(newGame),
        money: newGame.money - item.price,
    })

    return true
}

export const storeItems: StoreItem[] = [
    {
        icon: PauseCircleFillMedia,
        name: "Заморозка",
        description:
            "Ваш стрик не будет сбрасываться, если вы не выполните привычку. Активируется на 1 день.",
        price: 150,
        purchase: () => ({ frozenUntil: new Date(now().getTime() + 24 * 60 * 60 * 1000) }),
    },
    {
        icon: SpeedFillMedia,
        name: "Бустер",
        description: "Удваивает опыт за выполненные привычки. Активируется на 3 дня.",
        price: 80,
        purchase: () => ({ boostUntil: new Date(now().getTime() + 3 * 24 * 60 * 60 * 1000) }),
    },
    {
        icon: SparklingFillWeather,
        name: "неко арк",
        description: "Добавляет одну неко арк в ваш интерфейс.",
        price: 250,
        purchase: (game) => ({ necoArc: game.necoArc + 1 }),
    },
]
