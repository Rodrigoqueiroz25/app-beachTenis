
import { HTTPMETHODS } from "@/constants/httpMethods";

export interface IRequest<T = unknown>{
    method: HTTPMETHODS,
    body?: T,
    cookie?: string,
    url: string
}
