

export interface ICategory {
    description: string;
    tournamentId?: number;
    numberAthletes: string;
    numberAthletesRegistration: string;
}

export interface ICategoryRegistered extends ICategory {
    id: string;
    deleted: boolean;
}


