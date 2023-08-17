import { description } from "constants/wordsPhrases";

export interface ISport {
    id: number;
    [description]: string;
    deleted?: boolean;
}