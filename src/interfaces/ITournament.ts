
import { description, dateFinalRegistration, dateFinalTournament, dateStartRegistration, dateStartTournament, organization, otherInformation, sport, city, dateStartTournamentFormatted, dateFinalTournamentFormatted, dateStartRegistrationFormatted, dateFinalRegistrationFormatted, opened, finished } from "constants/wordsPhrases";


interface ITournament {
    [description]: string
    [organization]: string
    [dateStartTournament]: string
    [dateFinalTournament]: string
    [dateStartRegistration]: string
    [dateFinalRegistration]: string
    [otherInformation]: string
}

export interface IFormTournament extends ITournament {
    [city]: string
    [sport]: string
}


export interface ITournamentDataGetResponse extends IFormTournament{
    id: number
    [dateStartTournamentFormatted]: string
    [dateFinalTournamentFormatted]: string
    [dateStartRegistrationFormatted]: string
    [dateFinalRegistrationFormatted]: string
}

export interface ITournamentDataGetAllResponse extends ITournament {
    [opened]: ITournamentDataGetResponse[];
    [finished]: ITournamentDataGetResponse[];
}


export interface ITournamentDataWriteResponse extends IFormTournament{
    id: string
}
