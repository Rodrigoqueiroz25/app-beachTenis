// import { ENDPOINT } from "@/constants/endPoints";
import { HTTPMETHODS } from "@/constants/httpMethods";

export interface IRequest{
    method: HTTPMETHODS,
    endPoint: string,
    parametersURL?: string,
    parametersSearch?: string,
    url: (id?: string) => string
}