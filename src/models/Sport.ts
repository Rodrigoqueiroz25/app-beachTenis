
import { isError } from "interfaces/IError";
import { haveProperty } from "functions/haveProperty";

export type SportRemote = {
    id: number;
    description: string;
}

export type SportSend = Omit<SportRemote, 'id'>;


export type FieldsSport = {
    description: string,
}


function isSportRemote(category: SportRemote): category is SportRemote {
    return (category as SportRemote).description !== undefined;
}

export class Sport {

    public id: number;
    public description: string;


    constructor(data: SportRemote) {
        if (!isSportRemote(data)) {
            throw new Error('is not category remote passed');
        }
        else {
            this.id = haveProperty('id', data);
            this.description = haveProperty('description', data);
        }
    }

    public static toFieldsFormFormat(data: Sport): FieldsSport {
        return {
            description: data['description'],
        }
    }

    public static toOptionCombobox(data: Sport[]){
        return data?.map((sport) => (
            {name: sport.description, value: sport.id}
        ))
    }


    public static formatToSend(data: FieldsSport): SportSend {
        console.log(data);
        return {
            description: data['description'],
        }
    }

    public static mapDataRemote(rawData: any) {
        if (isSportRemote(rawData)) {
            return new Sport(rawData);
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
                if (isSportRemote(data)) {
                    return new Sport(data);
                }
            })
        }
        return [] as Sport[]
    }

}