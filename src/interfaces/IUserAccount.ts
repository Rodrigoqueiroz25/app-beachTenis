import { city, dateBirthday, email, gender, nameUser, phoneNumber, photo } from "constants/wordsPhrases";

export interface IUserAccount {
    id?: string
    [email]: string;
    [nameUser]: string;
    [phoneNumber]: string;
    [gender]: string;
    [city]: string;
    [dateBirthday]: string;
    [photo]?: string;
}