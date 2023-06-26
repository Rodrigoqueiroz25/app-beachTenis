
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import { AddTournamentDataForm } from "../types/tournament";


export default function useFetchTournament(){
       
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [ok, setOk] = useState<Boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string>();
    
    const { getCookieToken } = useCookiesSession();
    
    
    async function fetchTournament(method: string, endPoint: string, data?: AddTournamentDataForm){
        const options: RequestInit = {
            method: method,
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
            let response = await fetch(`${process.env.REACT_APP_HOST_API}:${process.env.REACT_APP_PORT_API}/api/${endPoint}`, options);
            
            if(response.status === 200){
                let json = await response.json();
                setIsLoading(false);
                setData([].concat(json));
                setOk(true);
            }
            else if(response.status === 204){
                setIsLoading(false);
                setOk(true);
            }
            else if(response.status === 403){
                let json = await response.json();
                setIsLoading(false);
                setOk(false);
                setError(json['error']);
            }
            else{
                let json = await response.json();
                setIsLoading(false);
                setOk(false);
                setError(json['error']);
            }
            
        } catch (err: any) {
            setIsLoading(false);
            console.error(err.message);
            setError("Erro, tente novamente mais tarde.");
        }
        
    }

    async function registerTournament(data: AddTournamentDataForm) {
        fetchTournament('POST', 'tournament', data);
    }

    async function getTournaments() {
        fetchTournament('GET', 'tournaments');
    }
    
    return {
        isLoading,
        error,
        data,
        ok,
        registerTournament,
        getTournaments
    };
    
}