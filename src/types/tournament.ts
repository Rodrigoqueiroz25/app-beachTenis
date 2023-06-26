import { City, Sport } from "./login"

export type AddTournamentDataForm = {
    description: string
    cityId: string
    sportId: string
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: string
    otherInformation: string
    organization: string
}


export type TournamentRegistered = {
    id: number
    description: string
    organization: string
    sport: Sport
    city: City
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: string
    otherInformation: string
    deleted: boolean
}