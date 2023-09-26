
import { brazilDateString } from "helper/convertData";
import { haveProperty } from "functions/haveProperty";
import { isError } from "interfaces/IError";

export type UserAccountRemote = {
    id: number;
    name: string;
    gender: string;
    email: string;
    phoneNumber: string;
    dateBirthday: string;
    //photo: string;
    cityId: number;
}

export type UserAccountSendUpdate = Omit<UserAccountRemote, 'id'>

export type UserAccountSendCreate = Omit<UserAccountRemote, 'id'> & {password: string} 

export type FieldsUpdateUserAccount = Omit<UserAccountRemote, 'id' >

export type FieldsCreateUserAccountPart1 = {
    phoneNumber: string;
    email: string;
    password: string;
    repeatPassword: number;
}

export type FieldsCreateUserAccountPart2 = {
    firstName: string,
    lastName: string,
    dateBirthday: string,
    gender: string,
}

export type FieldsCreateUserAccount = FieldsCreateUserAccountPart1 & FieldsCreateUserAccountPart2;



function isUserAccountRemote(userAccount: UserAccountRemote): userAccount is UserAccountRemote {
    return (userAccount as UserAccountRemote).dateBirthday !== undefined;
}


export class UserAccount {

    public id: number;
    public name: string;
    public gender: string;
    public email: string;
    public phoneNumber: string;
    public dateBirthday: string;
    //public photo: string;
    public cityCode: number;


    constructor(data: UserAccountRemote) {
        if (!isUserAccountRemote(data)) {
            throw new Error('is not userAccount remote passed');
        }
        else {
            this.id = data.id;
            this.name = data.name;
            this.gender = data.gender;
            this.email = data.email;
            this.phoneNumber = data.phoneNumber;
            this.cityCode = data.cityId;
            this.dateBirthday = data.dateBirthday;
            //this.photo = data.photo;
        }
    }

    public static toFieldsFormUpdateFormat(data: UserAccount): FieldsUpdateUserAccount {
        return {
            name: data.name,
            gender: data.gender,
            email: data.email,
            phoneNumber: data.phoneNumber,
            cityId: data.cityCode,
            dateBirthday: data.dateBirthday,
            //photo: data.photo
        }
    }

    public static formatToSendCreate(data: FieldsCreateUserAccount): UserAccountSendCreate {
        return {
            name: `${data.firstName} ${data.lastName}`,
            dateBirthday: brazilDateString(data['dateBirthday']),
            cityId: 4709,
            email: data['email'],
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            //photo: data.photo,
            password: data.password
        }
    }

    public static formatToSendUpdate(data: FieldsUpdateUserAccount): UserAccountSendUpdate {
        console.log(data);
        return {
            name: data.name,
            dateBirthday: brazilDateString(data['dateBirthday']),
            cityId: data.cityId,
            email: data['email'],
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            //photo: data.photo
        }
    }

    public static mapArrayDataRemote(rawData: any[]) {
        if (isError(rawData)) {
            return rawData;
        }
        if (haveProperty('map', rawData)) {
            return rawData.map((data) => {
                if (isUserAccountRemote(data)) {
                    return new UserAccount(data);
                }
            })
        }
        return [] as UserAccount[];
    }

    public static mapDataRemote(rawData: any) {
        if (isUserAccountRemote(rawData)) {
            return new UserAccount(rawData);
        }
        if (isError(rawData)) {
            return rawData;
        }
    }



}

