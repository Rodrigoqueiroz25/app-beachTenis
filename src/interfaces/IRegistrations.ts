
export interface IRegistrationPostResponse{
    id: string;
    isPlay: boolean;
    registrationsId: string;
    athlete: IAthlete;
}

export interface IRegistrationGetResponse{
    id: string;
    athletes: IAthlete[];
}

export interface IRegistrationPostBody{
    categoryId: string;
    athletesId: string;
}



interface IAthlete {
    id: string;
    name: string;
    photo?: any;
    isPlay: boolean;
    canDeleted: boolean;
}
