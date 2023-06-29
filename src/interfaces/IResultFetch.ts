import { IError } from "./IError";


export interface IResultFetch<T> {
    data?: T | IError;
    code: number;
    ok: boolean;
    catchErr: string;
}

