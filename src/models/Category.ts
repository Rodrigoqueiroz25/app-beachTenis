
import { haveProperty } from "functions/haveProperty";
import { isError } from "interfaces/IError";

export type CategoryRemote = {
    id: number;
    description: string;
    numberAthletes: string;
    numberAthletesRegistration: string;
    tournamentId: number;
    numberRegistration: number;
    isUserLoggedRegistered?: boolean;
}

export type CategorySend = Omit<CategoryRemote, 'id' | 'numberRegistration' >;

export type FieldsCategory = {
    description: string,
    numberAthletesPerRegistration: string,
    numberMaxAthletes: string
}


function isCategoryRemote(category: CategoryRemote): category is CategoryRemote {
    return (category as CategoryRemote).numberAthletes !== undefined;
}

export class Category {

    public id: number;
    public description: string;
    public numberMaxAthletes: string;
    public numberAthletesPerRegistration: string;
    public linkedToTournament: number;
    public numberAthletesRegistered: number;
    public userLoggedRegistered?: boolean;


    constructor(data: CategoryRemote) {
        if (!isCategoryRemote(data)) {
            throw new Error('is not category remote passed');
        }
        else {
            this.id = haveProperty('id', data);
            this.description = haveProperty('description', data);
            this.numberMaxAthletes = haveProperty('numberAthletes', data)
            this.numberAthletesPerRegistration = haveProperty('numberAthletesRegistration', data)
            this.linkedToTournament = haveProperty('tournamentId', data)
            this.numberAthletesRegistered = haveProperty('numberRegistration', data)
            this.userLoggedRegistered = haveProperty('isUserLoggedRegistered', data);
        }
    }

    public static toFieldsFormFormat(data: Category): FieldsCategory {
        return {
            description: data['description'],
            numberMaxAthletes: data['numberMaxAthletes'],
            numberAthletesPerRegistration: data['numberAthletesPerRegistration']
        }
    }


    public static formatToSend(data: FieldsCategory, idTournament: number): CategorySend {
        console.log(data);
        return {
            description: data['description'],
            numberAthletes: data['numberMaxAthletes'],
            numberAthletesRegistration: data['numberAthletesPerRegistration'],
            tournamentId: idTournament
        }
    }

    public static mapDataRemote(rawData: any) {
        if (isCategoryRemote(rawData)) {
            return new Category(rawData);
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
                if (isCategoryRemote(data)) {
                    return new Category(data);
                }
            })
        }
        return [] as Category[]
    }

}