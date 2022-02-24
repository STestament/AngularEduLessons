export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    isSelectEdictState: boolean,
    executedPerson: executedPerson    
}

export type countTypes = {
    executorType: string,
    count: number
}

export enum executedPerson {
    Unassigned = "Unassigned",
    CityBuilder = "CityBuilder",
    WarChief = "WarChief",
    Advisor = "Advisor",
    Spy = "Spy"
}