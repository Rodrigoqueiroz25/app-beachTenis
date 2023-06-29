import { ICity } from "./ICity"
import { ISport } from "./ISport"

interface ITournament {
    description: string
    organization: string
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: string
    otherInformation: string
}

export interface IFormAddTournament extends ITournament {
    cityId: string
    sportId: string
}

export interface ITournamentRegistered extends ITournament {
    id: number
    sport: ISport
    city: ICity
    deleted: boolean
}