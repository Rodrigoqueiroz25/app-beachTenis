import { nameUser, otherInformation, photo, tournamentId } from "constants/wordsPhrases";

export interface IFormTournamentSponsor {
    [nameUser]: string,
    [otherInformation]: string
}
export interface ITournamentSponsor extends IFormTournamentSponsor{
    [tournamentId]: string;
    [photo]?: string;
}

export interface ITournamentSponsorResponse extends ITournamentSponsor{
    id: string;
}