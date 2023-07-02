
import { useContext, useState } from "react";
import { ContextSignup } from "@/contexts/ContextSignup";
import useCookiesSession from "./useCookiesSession";
import request from "@/helper/request";
import { IDataSignUp } from "@/interfaces/IDataSignUp";
import { isError } from "@/interfaces/IError";
import { ILoginResult } from "@/interfaces/ILoginResult";
import { Requests } from "@/helper/Requests";


export default function useSignup(){
       
    const {state, setState} = useContext(ContextSignup);
    
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const { setCookiesSession } = useCookiesSession();
    
    
    async function signup(){
        setIsLoading(true);
        let result = await request<ILoginResult, IDataSignUp>(Requests.signup({
            email: state.email.toLowerCase(),
            password: state.password.toLowerCase(),
            name: state.name.toLowerCase(),
            phoneNumber: state.phoneNumber.toLowerCase(),
            gender: state.gender,
            cityId: state.cityId,
            dateBirthday: state.dateBirthday.toLowerCase().split('-').reverse().join('/'),
            role: ""
        }));
        setIsLoading(false);
        if(result.ok){
            switch (result.code) {
                case 200:
                    if(!isError(result.data)){
                        setCookiesSession(result.data?.accessToken as string, result.data?.name as string);
                    }
                    setIsAuth(true);
                    break;
                case 403:
                    console.error(result.code, result.data);
                    setError("Email já cadastrado");
                    setState({...state, password: ""});
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
        isAuth,
        error,
        signup
    };
    
}