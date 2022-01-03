export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    isSelectEdictState: boolean,
    executedPerson: executedPerson    
}

export enum executedPerson {
    Unassigned = "Unassigned",
    CityBuilder = "CityBuilder",
    WarChief = "WarChief",
    Advisor = "Advisor",
    Spy = "Spy"
}