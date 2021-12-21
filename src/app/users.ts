export type UserType = {
    login: string,
    hasPermissions: boolean
}

export const king: UserType = {
    login: 'King',
    hasPermissions: true
}
export const citizen: UserType = {
    login: 'Citizen',
    hasPermissions: false
}