
import { useContext, useState } from "react";
import { ContextSignup } from "@/contexts/ContextSignup";
import request from "@/helper/request";
import { IDataSignUp } from "@/interfaces/IDataSignUp";
// import { ILoginResult } from "@/interfaces/ILoginResult";
import { Requests } from "@/helper/Requests";


export default function useSignup(){
       
    const contextSignup = useContext(ContextSignup);
    
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [ok, setOk] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    // const { setCookiesSession } = useCookiesSession();

    async function signup(){
        setIsLoading(true);
        let result = await request<{}, IDataSignUp>(Requests.signup({
            email: contextSignup.state.email.toLowerCase(),
            password: contextSignup.state.password.toLowerCase(),
            name: contextSignup.state.name.toLowerCase(),
            phoneNumber: contextSignup.state.phoneNumber.toLowerCase(),
            gender: contextSignup.state.gender,
            cityId: contextSignup.state.cityId,
            dateBirthday: contextSignup.state.dateBirthday.toLowerCase().split('-').reverse().join('/'),
            role: ""
        }));
        setIsLoading(false);
        if(result.ok){
            switch (result.code) {
                case 200:
                    // if(!isError(result.data)){
                    //     if(result.data){
                    //         setCookiesSession(result.data.accessToken, result.data.name, result.data.isAdmin);
                    //     }
                    // }
                    setOk(true);
                    break;
                case 403:
                    console.error(result.code, result.data);
                    setError("Email já cadastrado");
                    // contextSignup.setState({...contextSignup.state, password: ""});
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