
export interface IUserAccountUpdate {
    email: string;
    name: string;
    phoneNumber: string;
    gender: string;
    cityId: string;
    dateBirthday: string;
    photo?: string | null;
}