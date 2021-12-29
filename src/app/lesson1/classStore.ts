export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    isSelectEdictState: boolean,
    executedPerson: executedPerson    
}

export enum executedPerson {
    Unassigned = "Не назначен",
    CityBuilder = "Градостроитель",
    WarChief = "Военачальник",
    Advisor = "Советник",
    Spy = "Шпион"
}