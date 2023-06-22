
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import { AddTour } from "../pages/AddTournament/AddTournament";


export default function useFetchTournament(){
       
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [response, setResponse] = useState<any>();
    const [error, setError] = useState<unknown>();
    
    const { getCookieToken } = useCookiesSession();
    
    
    async function registerTournament(data: AddTour){
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
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/tournament`, options);
            
            if(response.status === 200){
                let json = await response.json();
                setIsLoading(false);
                setResponse(json);
                setIsRegistered(true);
            }
            else if(response.status === 403){
                let json = await response.json();
                setIsLoading(false);
                setResponse(json['error']);
            }
            else{
                let json = await response.json();
                setIsLoading(false);
                setResponse(json['error']);
            }
            
        } catch (err) {
            setIsLoading(false);
            setError(err);
            setResponse("Erro, tente novamente mais tarde");
        }
        
    }
    
    return {
        isLoading,
        error,
        response,
        isRegistered,
        registerTournament
    };
    
}