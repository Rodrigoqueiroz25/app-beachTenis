
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import request from "@/helper/request";
import { IDataLogin } from "@/interfaces/IDataLogin";
import { isError } from "@/interfaces/IError";
import { ILoginResult } from "@/interfaces/ILoginResult";
import { Requests } from "@/helper/Requests";

export default function useAuth(){
       
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const { setCookiesSession } = useCookiesSession();

    async function authenticate(email: string, passwd: string){
        setIsLoading(true);
        let result = await request<ILoginResult, IDataLogin>(Requests.login({email: email, password: passwd}));
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