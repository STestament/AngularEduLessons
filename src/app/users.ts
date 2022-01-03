export class UserType {
    login: string = "None";
    hasPermissions: boolean = false;
}

export const king: UserType = {
    login: 'King',
    hasPermissions: true
}
export const citizen: UserType = {
    login: 'Citizen',
    hasPermissions: false
}