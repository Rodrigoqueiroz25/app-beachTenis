

export interface Category {
    description: string;
    tournamentId?: number;
    numberAthletes: number;
    numberAthletesRegistration: number;
}

export interface CategoryRegistered extends Category {
    id: number;
    deleted: boolean;
}


