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

export interface IFormTournament extends ITournament {
    cityId: string
    sportId: string
}

export interface ITournamentRegistered extends ITournament {
    id: number
    sport: ISport
    city: ICity
    deleted: boolean
    dtStartTournamentFormatted: string
    dtFinalTournamentFormatted: string
    dtStartRegistrationFormatted: string
    dtFinalRegistrationFormatted: string

}

export interface ITournamentForm{
    description: string
    organization: string
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: Date
    otherInformation: string
    cityId: string
    sportId: string
}