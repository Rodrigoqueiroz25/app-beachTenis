
export interface IUserAccount {
    id: string
    email: string;
    name: string;
    phoneNumber: string;
    gender: "M" | "F" | "";
    cityId: string;
    dateBirthday: string;
    photo?: string | null;
}