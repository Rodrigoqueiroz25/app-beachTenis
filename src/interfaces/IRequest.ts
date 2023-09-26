
import { HTTPMETHODS } from "constants/httpMethods";

export interface IRequest{
    method: HTTPMETHODS,
    body?: any,
    cookie?: string,
    url: string
}
