
import { isError } from "interfaces/IError";
import { haveProperty } from "functions/haveProperty";

export type CityRemote = {
    id: number;
    area: string;
    codeIbge: number;
    name: string;
    stateId: number;
    gentilic: string;
}

// export type CitySend = Omit<CityRemote, 'id'>;

// export type FieldsCity = {
//     areaM2: string;
//     codeIbge: number;
//     name: string;
//     stateCode: number;
//     gentilic: string;
// }


function isCityRemote(city: CityRemote): city is CityRemote {
    return (city as CityRemote).codeIbge !== undefined;
}

export class City {

    public id: number;
    public areaM2: string;
    public codeIbge: number;
    public name: string;
    public stateCode: number;
    public gentilic: string;


    constructor(data: CityRemote) {
        if (!isCityRemote(data)) {
            throw new Error('is not city remote passed');
        }
        else {
            this.id = data.id;
            this.areaM2 = data.area;
            this.codeIbge = data.codeIbge;
            this.name = data.name;
            this.stateCode = data.stateId;
            this.gentilic = data.gentilic;
        }
    }

    // public static toFieldsFormFormat(data: City): FieldsCity {
    //     return {
    //         areaM2: data['areaM2'],
    //         codeIbge: data['codeIbge'],
    //         name: data['name'],
    //         stateCode: data['stateCode'],
    //         gentilic: data['gentilic']
    //     }
    // }

    public static toOptionCombobox(data: City[]) {
        return data?.map((city) => (
            { name: city.name, value: city.id }
        ))
    }


    // public static formatToSend(data: FieldsCity): CitySend {
    //     console.log(data);
    //     return {
    //         area: data['areaM2'],
    //         codeIbge: data['codeIbge'],
    //         name: data['name'],
    //         stateId: data['stateCode'],
    //         gentilic: data['gentilic']
    //     }
    // }

    public static mapDataRemote(rawData: any) {
        if (isCityRemote(rawData)) {
            return new City(rawData);
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
                if (isCityRemote(data)) {
                    return new City(data);
                }
            })
        }
        return [] as City[]
    }

}