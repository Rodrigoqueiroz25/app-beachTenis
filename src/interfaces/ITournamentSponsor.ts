
export interface ITournamentSponsor {
    name: string,
    tournamentId: string,
    photo?: string,
    otherInformation: string
}

export interface ITournamentSponsorRegistered extends ITournamentSponsor{
    id: number
    deleted: boolean
}