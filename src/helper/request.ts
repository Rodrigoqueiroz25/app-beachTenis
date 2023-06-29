
import { IError } from "@/interfaces/IError";
import { IRequest } from "@/interfaces/IRequest";
import { IResultFetch } from "@/interfaces/IResultFetch";

// export default async function request<R, E>(method: string, endPoint: string, cookie?: string, data?: E) {
export default async function request<R, E>(paramRequest: IRequest, data?: E, cookie?: string) {

    let result: IResultFetch<R> = {
        code: 0,
        ok: false,
        catchErr: ""
    }

    const options: RequestInit = {
        method: paramRequest.method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'x-access-token': `${cookie}`
        },
        body: JSON.stringify(data),
        mode: 'cors'
    }

    try {
        let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api${paramRequest.url()}`, options);
        result.code = response.status;
        result.ok = true;
        if(response.status === 200){
            result.data = await response?.json() as R;
        }else{
            result.data = await response?.json() as IError;
        }
        
        return result;

    } catch (err: any) {
        console.error(err.message);
        result.catchErr = "Erro, tente novamente mais tarde";
        return result;
    }

}
