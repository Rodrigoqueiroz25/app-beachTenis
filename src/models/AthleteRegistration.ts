
import { haveProperty } from "functions/haveProperty";
import { isError } from "interfaces/IError";


export type AthleteRegistrationRemote = {
    id: number;
    isPay: boolean;
    registrationsId: number;
    athlete: {
        id: number,
        name: string
    }
}


function isAthleteRegistrationRemote(athleteRegistration: any): athleteRegistration is AthleteRegistrationRemote {
    return (athleteRegistration as AthleteRegistrationRemote).isPay !== undefined;
}

export class AthleteRegistration {

    public id: number;
    public teamId: number;
    public itsPaid: boolean;
    public athleteId: number;
    public athleteName: string;
    

    constructor(data: AthleteRegistrationRemote) {
        if (!isAthleteRegistrationRemote(data)) {
            throw new Error('is not athlete registration remote passed');
        }
        else {
            this.id = haveProperty('id', data);
            this.teamId = data.registrationsId;
            this.itsPaid = data.isPay;
            this.athleteId = data.athlete.id;
            this.athleteName = data.athlete.name;
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
    //     if (isAthleteRegistrationRemote(rawData)) {
    //         return new AthleteRegistration(rawData);
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
                if (isAthleteRegistrationRemote(data)) {
                    return new AthleteRegistration(data);
                }
                return undefined
            })
        }
        return [] as AthleteRegistration[];
    }

}