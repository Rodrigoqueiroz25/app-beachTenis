
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import { AddCategory, CategoryRegistered } from "../types/category";


export default function useFetchCategory(){
       
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [response, setResponse] = useState<CategoryRegistered | string>("");
    const [error, setError] = useState<string>();
    
    const { getCookieToken } = useCookiesSession();
    
    
    async function registerCategory(data: AddCategory){
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'x-access-token': `${getCookieToken()}`
            },
            body: JSON.stringify(data),
            mode: 'cors'
        }
        
        try {
            setIsLoading(true);
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/category`, options);
            
            if(response.status === 200){
                let json = await response.json() as CategoryRegistered;
                setIsLoading(false);
                setResponse(json);
                setIsRegistered(true);
                console.log(json);
            }
            else if(response.status === 403){
                let json = await response.json();
                setIsLoading(false);
                setError(json['error']);
            }
            else{
                let json = await response.json();
                setIsLoading(false);
                setError(json['error']);
            }
            
        } catch (err: any) {
            setIsLoading(false);
            setError(err.message);
            setResponse("Erro, tente novamente mais tarde");
        }
        
    }
    
    return {
        isLoading,
        error,
        response,
        isRegistered,
        registerCategory
    };
    
}