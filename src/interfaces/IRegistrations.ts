
export interface IRegistrationPostResponse{ // dados de registro dos atletas do time registrado em uma categoria
    id: string;
    isPay: boolean;
    registrationsId: string; //id do time
    athlete: IAthlete;
}

export interface IRegistrationGetResponse{ //time Registrado em uma categoria
    id: string;
    athletes: IAthlete[];
}

export interface IRegistrationPostBody{ //registrando um time em uma categoria
    categoryId: string;
    athletesId: string;
}



interface IAthlete { // atleta.
    id: string;
    name: string;
    photo?: any;

    isPay: boolean;
    
}


export type registerTeam = {
    categoryId: string;
    athletesId: number[];
}

type teamRegistered = {
    id: string;
    athletes: IAthlete[];
}

type registerAthlete = {
    id: string;
    isPay: boolean;
    teamId: string;
    athlete: IAthlete;
}
