
import { haveProperty } from "functions/haveProperty";
import { isError } from "interfaces/IError";

export type TournamentSponsorRemote = {
    id: number;
    name: string;
    tournamentId: number;
    otherInformation: string;
    photo?: string;
}

export type TournamentSponsorSend = Omit<TournamentSponsorRemote, 'id'>


export type FieldsTournamentSponsor = {
    name: string,
    otherInformation: string,
}


function isTournamentSponsorRemote(tournamentSponsor: TournamentSponsorRemote): tournamentSponsor is TournamentSponsorRemote {
    return (tournamentSponsor as TournamentSponsorRemote).tournamentId !== undefined;
}



export class TournamentSponsor {

    public id: number;
    public name: string;
    public photo?: string;
    public linkedToTournament: number;
    public otherInformation: string;


    constructor(data: TournamentSponsorRemote) {
        if (!isTournamentSponsorRemote(data)) {
            throw new Error('is not tournament sponsor remote passed');
        }
        else {
            this.id = data.id;
            this.name = data.name;
            this.photo = data.photo;
            this.linkedToTournament = data.tournamentId;
            this.otherInformation = data.otherInformation;
        }
    }

    public static formatToSend(data: FieldsTournamentSponsor, tournamentId: number): TournamentSponsorSend{
        console.log(data);
        return {
            tournamentId: tournamentId,
            name: data['name'],
            otherInformation: data['otherInformation']
        }
    }

    public static mapDataRemote(rawData: any) {
        if (isTournamentSponsorRemote(rawData)) {
            return new TournamentSponsor(rawData);
        }
        if (isError(rawData)) {
            return rawData;
        }
    }

    public static mapArrayDataRemote(rawData: any[]) {
        if (isError(rawData)) {
            return rawData;
        }
        if (haveProperty('map', rawData)) {
            return rawData.map((data) => {
                if (isTournamentSponsorRemote(data)) {
                    return new TournamentSponsor(data);
                }
            })
        }
        return [] as TournamentSponsor[];
    }
    

}
