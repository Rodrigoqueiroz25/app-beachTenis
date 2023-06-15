
import { useContext, useState } from "react";
import { TLogado } from "../types/login";
import { ContextSignup } from "../contexts/ContextSignup";
import useCookiesSession from "./useCookiesSession";


export default function useSignup(){
       
    const {state, setState} = useContext(ContextSignup);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [msgFailedAuth, setMsgFailedAuth] = useState<String>('');
    const [isAuth, setIsAuth] = useState<Boolean>(false);
    const [error, setError] = useState<unknown>();
    
    const { setCookiesSession } = useCookiesSession();
    
    
    async function signup(){
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            },
            body: JSON.stringify({
                email: state.email.toLowerCase(),
                password: state.password.toLowerCase(),
                name: `${state.firstName.toLowerCase()} ${state.lastName.toLowerCase()}`,
                phoneNumber: state.phoneNumber.toLowerCase(),
                gender: state.gender.toLowerCase(),
                cityId: state.cityId,
                birthDate: state.birthDate.toLowerCase()
            }),
            mode: 'cors'
        }
        
        try {
            setIsLoading(true);
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/signup`, options);
            
            if(response.status === 200){
                let json = await response.json() as TLogado;
                setCookiesSession(json.accessToken, json.name);
                setIsAuth(true);
                setIsLoading(false);
                setMsgFailedAuth('');
            }
            else if(response.status === 403){
                setIsLoading(false);
                setIsAuth(false);
                setMsgFailedAuth("Email já cadastrado");
                setState({...state, password: ""})
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
        signup
    };
    
}