import { IError } from "./IError";


export interface IResultFetch {
    data?: any | IError;
    code: number;
    ok: boolean;
    catchErr: string;
}

