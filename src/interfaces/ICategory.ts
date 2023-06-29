

export interface ICategory {
    description: string;
    tournamentId?: number;
    numberAthletes: number;
    numberAthletesRegistration: number;
}

export interface ICategoryRegistered extends ICategory {
    id: number;
    deleted: boolean;
}


