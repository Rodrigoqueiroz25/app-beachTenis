import { useState } from "react";
import { useCookies } from "react-cookie";


export default function useGetFetch<T>(){
       
    const [msgFailedGet, setMsgFailedGet] = useState<String>('');
    const [error, setError] = useState<unknown>();
    const [result, setResult] = useState<T[]>([]);
    
    const [cookies, setCookies] = useCookies();
    
    
    async function getData(endpoint: string){
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'x-access-token': `${cookies.user_session}`
            },
            mode: 'cors'
        }
        
        try {
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/${endpoint}`, options);
            
            if(response.status === 200){
                let json = await response.json() as T[];
                setResult(json);
            }
            else if(response.status === 403){
                setMsgFailedGet("Acesso negado");
            }
            else{
                setMsgFailedGet("Erro, tente novamente mais tarde");
            }
            
        } catch (err) {
            setError(err);
            setMsgFailedGet("Erro, tente novamente mais tarde");
        }
        
    }
    
    return {
        result,
        error,
        msgFailedGet,
        getData
    };
    
}