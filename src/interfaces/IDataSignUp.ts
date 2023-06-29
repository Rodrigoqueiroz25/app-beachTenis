
export interface IDataSignUp {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    gender: "M" | "F" | "";
    cityId: string;
    dateBirthday: string;
    role: string;
    photo?: string;
}