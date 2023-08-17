import { description, maxNumberAthletesCategory, numberAthletesPerRegistration, tournamentId } from "constants/wordsPhrases";


export interface IFormCategory {
    [description]: string;
    [maxNumberAthletesCategory]: string;
    [numberAthletesPerRegistration]: string;
}

export interface ICategory extends IFormCategory{
    [tournamentId]: number;
}

export interface ICategoryDataWriteResponse extends ICategory{
    id: string;
}

export interface ICategoryGetResponse extends ICategory {
    id: string;
    numberRegistration: string;
}


