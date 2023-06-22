
export type AddCategory = {
    description: string,
    tournamentId: number,
    numberAthletes: number,
    numberAthletesRegistration: number
}

export type CategoryRegistered = {
    description: string,
    tournamentId: number,
    numberAthletes: number,
    numberAthletesRegistration: number,
    id: number,
    deleted: boolean
}