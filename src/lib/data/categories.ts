import {
    BriefcaseFillBusiness,
    GraduationCapFillOthers,
    HeartPulseFillHealthMedical,
    Home7FillBuildings,
    InboxFillBusiness,
    PingPongFillOthers,
    User5FillUserFaces,
} from "svelte-remix"

const categoryIcons = new Map([
    ["спорт", PingPongFillOthers],
    ["физическая активность", PingPongFillOthers],
    ["фитнес", PingPongFillOthers],
    ["здоровье", HeartPulseFillHealthMedical],
    ["работа", BriefcaseFillBusiness],
    ["карьера", BriefcaseFillBusiness],
    ["образование", GraduationCapFillOthers],
    ["учёба", GraduationCapFillOthers],
    ["учеба", GraduationCapFillOthers],
    ["языки", GraduationCapFillOthers],
    ["дом", Home7FillBuildings],
    ["домашние дела", Home7FillBuildings],
    ["дела по дому", Home7FillBuildings],
    ["личное", User5FillUserFaces],
    ["личные", User5FillUserFaces],
    ["личные дела", User5FillUserFaces],
    ["саморазвитие", User5FillUserFaces],
])

export function getCategoryIcon(categoryName: string) {
    return categoryIcons.get(categoryName.toLowerCase()) ?? InboxFillBusiness
}
