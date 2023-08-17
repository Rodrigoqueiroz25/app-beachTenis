import { city, dateBirthday, email, gender, nameUser, password, phoneNumber, photo, role } from "constants/wordsPhrases";

export interface IDataSignUp {
    [email]: string;
    [password]: string;
    [nameUser]: string;
    [phoneNumber]: string;
    [gender]: "M" | "F" | "";
    [city]: string;
    [dateBirthday]: string;
    [role]?: string;
    [photo]?: string;
}

