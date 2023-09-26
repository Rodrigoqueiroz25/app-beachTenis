import { isError } from "interfaces/IError";

export type DatesFormatted = {
    dtStartTournamentFormatted?: string;
    dtFinalTournamentFormatted?: string;
    dtStartRegistrationFormatted?: string;
    dtFinalRegistrationFormatted?: string;
}

export type TournamentRemote = {
    id: number;
    description: string;
    organization: string;
    dtStartTournament: string;
    dtFinalTournament: string;
    dtStartRegistration: string;
    dtFinalRegistration: string;
    cityId: number;
    sportId: number;
    otherInformation: string;
    photo?: string;
}

export type TournamentSend = Omit<TournamentRemote, 'id'>

export type FieldsTournament = {
    description: string,
    organization: string,
    dateStartTournament: string,
    dateFinalTournament: string,
    dateStartRegistration: string,
    dateFinalRegistration: string,
    otherInformation: string,
    cityCode: number,
    sportCode: number
}

export type TournamentFiltered = {
    opened: TournamentRemote[];
    finished: TournamentRemote[];
}

type FormatDate = {
    text: string;
    formatted?: string;
}

type Period = {
    dateInitial: FormatDate;
    dateFinal: FormatDate;
}


function isTournamentRemote(tournament: TournamentRemote): tournament is TournamentRemote {
    return (tournament as TournamentRemote).dtStartRegistration !== undefined;
}

function isArrayTournamentsRemote(tournaments: TournamentFiltered): tournaments is TournamentFiltered {
    return (tournaments as TournamentFiltered).opened !== undefined;
}


export class Tournament {

    public id: number;
    public description: string;
    public organization: string;
    public periodTournament: Period;
    public periodRegistration: Period;
    public cityCode: number;
    public sportCode: number;
    public otherInformation: string;


    constructor(data: TournamentRemote & DatesFormatted) {
        if (!isTournamentRemote(data)) {
            throw new Error('is not tournament remote passed');
        }
        else {
            this.id = data.id;
            this.description = data.description;
            this.organization = data.organization;
            this.periodRegistration = {
                dateInitial: {
                    text: data.dtStartRegistration,
                    formatted: data.dtStartRegistrationFormatted
                },
                dateFinal: {
                    text: data.dtFinalRegistration,
                    formatted: data.dtFinalRegistrationFormatted
                }
            };
            this.periodTournament = {
                dateInitial: {
                    text: data.dtStartTournament,
                    formatted: data.dtStartTournamentFormatted
                },
                dateFinal: {
                    text: data.dtFinalTournament,
                    formatted: data.dtFinalTournamentFormatted
                }
            }
            this.cityCode = data.cityId;
            this.sportCode = data.sportId;
            this.otherInformation = data.otherInformation;
        }
    }

    public static toFieldsFormFormat(data: Tournament): FieldsTournament {
        return {
            description: data.description,
            organization: data.organization,
            dateStartTournament: data.periodRegistration.dateInitial.text,
            dateFinalTournament: data.periodRegistration.dateFinal.text,
            dateStartRegistration: data.periodTournament.dateInitial.text,
            dateFinalRegistration: data.periodTournament.dateFinal.text,
            otherInformation: data.otherInformation,
            cityCode: data.cityCode,
            sportCode: data.sportCode,
        }
    }

    public static formatToSend(data: FieldsTournament): TournamentSend {
        console.log(data);
        return {
            description: data['description'],
            organization: data['organization'],
            cityId: data['cityCode'],
            sportId: data['sportCode'],
            otherInformation: data['otherInformation'],
            dtStartRegistration: data['dateStartRegistration'],
            dtFinalRegistration: data['dateFinalRegistration'],
            dtStartTournament: data['dateStartTournament'],
            dtFinalTournament: data['dateFinalTournament']
        }
    }

    public static mapDataArrayRemote(rawData: any) {
        if (isArrayTournamentsRemote(rawData)) {
            return {
                opened: rawData.opened?.map((tour) => new Tournament(tour)),
                finished: rawData.finished?.map((tour) => new Tournament(tour))
            }
        }
        if (isError(rawData)) {
            return rawData
        }

    }

    public static mapDataRemote(rawData: any) {
        if (isTournamentRemote(rawData)) {
            return new Tournament(rawData);
        }
        if (isError(rawData)) {
            return rawData;
        }
    }



}
