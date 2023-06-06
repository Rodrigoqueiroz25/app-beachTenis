import { useContext, useState } from "react";
import { TLogado } from "../types/login";
import { useCookies } from "react-cookie";
import { ContextSignup } from "../contexts/ContextSignup";


export default function useSignup(){
       
    const {state, setState} = useContext(ContextSignup);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [msgFailedAuth, setMsgFailedAuth] = useState<String>('');
    const [isAuth, setIsAuth] = useState<Boolean>(false);
    const [error, setError] = useState<unknown>();
    
    const [cookies, setCookies] = useCookies();
    
    
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
                setCookies('user_session', json.accessToken, {
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 20000
                });
                setCookies('user_name', json.name, {
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 20000
                });
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