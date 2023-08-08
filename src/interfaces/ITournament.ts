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


export interface ITournamentDataGetResponse extends ITournament{
    id: number
    cityId: string
    sportId: string
    dtStartTournamentFormatted: string
    dtFinalTournamentFormatted: string
    dtStartRegistrationFormatted: string
    dtFinalRegistrationFormatted: string
}

export interface ITournamentDataGetAllResponse extends ITournament {
    opened: ITournamentDataGetResponse[];
    finished: ITournamentDataGetResponse[];
}


export interface ITournamentDataWriteResponse extends ITournament{
    id: number
    cityId: string
    sportId: string
}
