export type edictItem = {
    id: number,
    header: string,
    description: string,
    dayOfComplete: number,
    state: boolean
    peopleRequests?: peopleRequest[];
}

export type peopleRequest = {
    id: number,
    name: string,
    text: string,
}