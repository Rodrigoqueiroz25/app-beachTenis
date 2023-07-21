
export interface IFormTournamentSponsor {
    name: string,
    otherInformation: string
}
export interface ITournamentSponsor extends IFormTournamentSponsor{
    tournamentId: string;
    photo?: string;
}

export interface ITournamentSponsorResponse extends ITournamentSponsor{
    id: string;
}