
export interface IUserAccount {
    id?: string
    email: string;
    name: string;
    phoneNumber: string;
    gender: string;
    cityId: string;
    dateBirthday: string;
    photo?: string | null;
}