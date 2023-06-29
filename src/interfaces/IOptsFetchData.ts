import { IResultFetch } from "./IResultFetch";

export interface IOptsFetchData{
    [name: string]: (p: IResultFetch<any>) => void;
}


