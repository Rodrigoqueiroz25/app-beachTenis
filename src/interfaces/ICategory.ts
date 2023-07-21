
export interface IFormCategory {
    description: string;
    numberAthletes: string;
    numberAthletesRegistration: string;
}

export interface ICategory extends IFormCategory{
    tournamentId: number;
}

export interface ICategoryDataWriteResponse extends ICategory{
    id: string;
}

export interface ICategoryGetResponse extends ICategory {
    id: string;
    numberRegistration: string;
}


