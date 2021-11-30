export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    isSelectEdictState: boolean
    peopleRequests?: peopleRequest[];
}

export type peopleRequest = {
    id: number,
    name: string,
    text: string,
}