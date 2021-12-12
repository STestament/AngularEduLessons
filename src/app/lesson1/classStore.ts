export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    isSelectEdictState: boolean,
    dateCreate?: Date,
    executedPerson?: string,
    peopleRequests?: peopleRequest[];
}

export type peopleRequest = {
    id: number,
    name: string,
    text: string,
}

export enum executedPerson {
    Unassigned = "Не назначен",
    CityBuilder = "Градостроитель",
    WarChief = "Военачальник",
    Advisor = "Советник",
    Spy = "Шпион"
}