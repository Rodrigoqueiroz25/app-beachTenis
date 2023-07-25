
import { useState } from "react";
import request from "helper/request";
import { IDataSignUp } from "interfaces/IDataSignUp";
import { IRequest } from "interfaces/IRequest";


export default function useSignup(){
       
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    

    async function signup(requestData: IRequest<IDataSignUp>){
        
        setIsLoading(true);
        let result = await request<{}>(requestData);
        setIsLoading(false);

        if(result.ok){
            switch (result.code) {
                case 200:
                    setOk(true);
                    break;
                case 403:
                    console.error(result.code, result.data);
                    setError("Email já cadastrado");
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
        ok,
        error,
        signup
    };
    
}