
import { isError } from "interfaces/IError";
import { haveProperty } from "functions/haveProperty";

type Athlete = {
    id: number,
    name: string,
    photo: string,
    isPay: boolean
}

export type TeamRemote = {
    id: number;
    athletes: Athlete[];
}


function isTeamRemote(team: any): team is TeamRemote {
    return (team as TeamRemote).athletes !== undefined;
}

export class Team {

    public id: number;
    public athletes: Athlete[];
    

    constructor(data: TeamRemote) {
        if (!isTeamRemote(data)) {
            throw new Error('is not athlete registration remote passed');
        }
        else {
            this.id = haveProperty('id', data);
            this.athletes = data.athletes;
        }
    }

    // public static toFieldsFormFormat(data: Category): FieldsCategory {
    //     return {
    //         description: data['description'],
    //         numberMaxAthletes: data['numberMaxAthletes'],
    //         numberAthletesPerRegistration: data['numberAthletesPerRegistration']
    //     }
    // }


    // public static formatToSend(data: FieldsCategory, idTournament: number): CategorySend {
    //     console.log(data);
    //     return {
    //         description: data['description'],
    //         numberAthletes: data['numberMaxAthletes'],
    //         numberAthletesRegistration: data['numberAthletesPerRegistration'],
    //         tournamentId: idTournament
    //     }
    // }

    // public static mapDataRemote(rawData: any) {
    //     if (isTeamRemote(rawData)) {
    //         return new Team(rawData);
    //     }
    //     if (isError(rawData)) {
    //         return rawData;
    //     }
    // }

    public static mapArrayDataRemote(rawData: any[]) {
        if (isError(rawData)) {
            return rawData;
        }
        if (haveProperty('map', rawData)) {
            return rawData.map((data) => {
                if (isTeamRemote(data)) {
                    return new Team(data);
                }
                return undefined
            })
        }
        return [] as Team[];
    }

}