
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import request from "@/helper/request";
import { isError } from "@/interfaces/IError";
import { ILoginResult } from "@/interfaces/ILoginResult";
import { IDataLogin } from "@/interfaces/IDataLogin";
import { IRequest } from "@/interfaces/IRequest";

export default function useAuth(){
       
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const { setCookiesSession } = useCookiesSession();

    async function authenticate(requestData: IRequest<IDataLogin>){
        
        setIsLoading(true);
        let result = await request<ILoginResult>(requestData);
        setIsLoading(false);
        
        if(result.ok){
            switch (result.code) {
                case 200:
                    if(!isError(result.data)){
                        if(result.data){
                            setCookiesSession(result.data.accessToken, result.data.name, result.data.isAdmin);
                        }
                    }
                    setIsAuth(true);
                    break;
                case 401:
                    console.error(result.code, result.data);
                    setError("usuario/senha invalido");
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
        authenticate,
        isLoading,
        isAuth,
        error
    }

}