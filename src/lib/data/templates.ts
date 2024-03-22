import type { HabitCreation } from "$lib/data/habits"

export type CategorisedTemplates = {
    category: string
    habitTemplates: Omit<HabitCreation, "category">[]
}

export const templates: CategorisedTemplates[] = [
    {
        category: "Спорт",
        habitTemplates: [
            {
                title: "Пройти пешком",
                period: "daily",
                targetValue: 10000,
                unit: "шагов",
            },
            {
                title: "Пробежаться",
                period: "daily",
                targetValue: 5,
                unit: "км",
            },
            {
                title: "Сделать зарядку",
                period: "daily",
            },
            {
                title: "Посетить тренажёрный зал",
                period: "weekly",
            },
        ],
    },
    {
        category: "Здоровье",
        habitTemplates: [
            {
                title: "Выпить воды",
                period: "daily",
                targetValue: 2000,
                unit: "мл",
            },
            {
                title: "Лечь спать в 23:00",
                period: "daily",
            },
            {
                title: "Почистить зубы",
                period: "daily",
            },
            {
                title: "Посетить врача",
                period: "monthly",
            },
            {
                title: "Медитировать",
                period: "daily",
            },
        ],
    },
    {
        category: "Работа",
        habitTemplates: [
            {
                title: "Проверить почту",
                period: "daily",
            },
            {
                title: "Прочитать профессиональную книгу",
                period: "monthly",
            },
            {
                title: "Составить план на день",
                period: "daily",
            },
            {
                title: "Обновить портфолио",
                period: "monthly",
            },
        ],
    },
    {
        category: "Дом",
        habitTemplates: [
            {
                title: "Помыть посуду",
                period: "daily",
            },
            {
                title: "Провести уборку",
                period: "weekly",
            },
            {
                title: "Погулять с собакой",
                period: "daily",
                targetValue: 2,
                unit: "раза",
            },
            {
                title: "Полить цветы",
                period: "weekly",
            },
            {
                title: "Купить продукты",
                period: "daily",
            },
        ],
    },
    {
        category: "Учёба",
        habitTemplates: [
            {
                title: "Сделать домашнее задание",
                period: "daily",
            },
            {
                title: "Повторить материал",
                period: "daily",
            },
            {
                title: "Проверить оценки",
                period: "weekly",
            },
        ],
    },
    {
        category: "Личное",
        habitTemplates: [
            {
                title: "Позвонить родственникам",
                period: "weekly",
            },
            {
                title: "Вести дневник",
                period: "daily",
            },
            {
                title: "Погулять на свежем воздухе",
                period: "daily",
            },
        ],
    },
]
