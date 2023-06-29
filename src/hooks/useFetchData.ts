
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import request from "@/helper/request";
import { isError } from "@/interfaces/IError";
import { IRequest } from "@/interfaces/IRequest";


export default function useFetchData<R, E = {}>() {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [ok, setOk] = useState<Boolean>(false);
    const [data, setData] = useState<R>();
    const [error, setError] = useState<string>();

    const { getCookieToken } = useCookiesSession();

    async function fetchData(requestData: IRequest, data?: E) {

        setIsLoading(true);
        let result = await request<R, E>(requestData, data, getCookieToken());
        setIsLoading(false);

        if(result.ok){
            switch (result.code) {
                case 200:
                    if(!isError(result.data)){
                        setData(result.data);
                    }
                    setOk(true);
                    break;
                case 204:
                    setOk(true);
                    break;
                case 403:
                    console.error(result.code, result.data);
                    setError("usuário não autorizado");
                    break;
                default:
                    console.error(result.code, result.data);
                    break;
            }
        }
        else{
            if(result.catchErr){
                console.error(result.catchErr);
                setError("Erro, tente novamente mais tarde.");
            }
        }
    }

    return {
        isLoading,
        error,
        data,
        ok,
        fetchData
    };

}