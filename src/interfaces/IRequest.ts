
import { HTTPMETHODS } from "constants/httpMethods";
import { INotContent } from "./INotContent";

export interface IRequest<T = INotContent>{
    method: HTTPMETHODS,
    body?: T,
    cookie?: string,
    url: string
}
