
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";


export default function useGetFetch(){
       
    const [msgFailedGet, setMsgFailedGet] = useState<String>('');
    const [error, setError] = useState<unknown>();

    const { getCookieToken } = useCookiesSession();
    
    
    async function getData(endpoint: string, data?: string){
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Accept-Encoding': 'gzip, deflate, br',
                'x-access-token': `${getCookieToken()}`
            },
            mode: 'cors'
        }
        
        try {
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/${endpoint}`, options);
            
            if(response.status === 200){
                let json = await response.json();
                if(data){
                    let arr = [...json];
                    for (const j of json) {
                        arr.push(j[data]);
                    }
                    return arr;
                }
                else{
                    return json;
                }
                
            }
            else if(response.status === 403){
                setMsgFailedGet("Acesso negado");
                return [];
            }
            else{
                setMsgFailedGet("Erro, tente novamente mais tarde");
                return [];
            }
            
        } catch (err) {
            setError(err);
            setMsgFailedGet("Erro, tente novamente mais tarde");
            return [];
        }
        
    }
    
    return {
        error,
        msgFailedGet,
        getData
    };
    
}