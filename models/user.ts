export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    settings: UserSettings
}

export interface UserSettings {
    height: {
        max: number
        min: number
    }
    lives: number
    objects: number
    speed: number
    width: {
        max: number
        min: number
    }
}