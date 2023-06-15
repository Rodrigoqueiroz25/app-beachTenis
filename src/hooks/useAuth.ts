
import { useState } from "react";
import { TLogado } from "../types/login";
import useCookiesSession from "./useCookiesSession";


export default function useAuth(email: string, senha: string){
       
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [msgFailedAuth, setMsgFailedAuth] = useState<String>('');
    const [isAuth, setIsAuth] = useState<Boolean>(false);
    const [error, setError] = useState<unknown>();
    
    const { setCookiesSession } = useCookiesSession();
    
    
    async function authenticate(email: string, passwd: string){
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                email: email.toLowerCase(),
                password: passwd.toLowerCase()
            }),
            mode: 'cors'
        }
        
        try {
            setIsLoading(true);
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/login`, options);
            
            if(response.status === 200){
                let json = await response.json() as TLogado;
                setCookiesSession(json.accessToken, json.name);
                setIsAuth(true);
                setIsLoading(false);
                setMsgFailedAuth('');
            }
            else if(response.status === 401){
                setIsLoading(false);
                setIsAuth(false);
                setMsgFailedAuth("usuario/senha invalido");
            }
            else{
                setIsLoading(false);
                setIsAuth(false);
                setMsgFailedAuth("Erro, tente novamente mais tarde");
            }
            
        } catch (err) {
            setIsLoading(false);
            setIsAuth(false);
            setError(err);
            setMsgFailedAuth("Erro, tente novamente mais tarde");
        }
        
    }
    
    return {
        isLoading,
        isAuth,
        error,
        msgFailedAuth,
        authenticate
    };
    
}