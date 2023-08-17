import { accessToken, isAdmin, nameUser } from "constants/wordsPhrases";

export interface ILoginResult {
    [accessToken]: string;
    [nameUser]: string;
    [isAdmin]: string;
}
