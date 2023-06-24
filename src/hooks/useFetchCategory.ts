
import { useState } from "react";
import useCookiesSession from "./useCookiesSession";
import { Category } from "../types/category";


export default function useFetchCategory(){
       
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [ok, setOk] = useState<Boolean>(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string>();
    
    const { getCookieToken } = useCookiesSession();
    

    async function fetchCategory(method: string, endPoint: string, data?: Category){
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
                let data = await response.json();
                setIsLoading(false);
                setData([].concat(data));
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

    async function registerCategory(data: Category) {
        fetchCategory('POST',"category", data);
    }

    async function registerCategoryEdited(data: Category, id: string) {
        fetchCategory('PUT',`category/${id}`, data);
    }

    async function getCategories(id: number) {
        fetchCategory('GET', `category/loadByTournament?tournamentId=${id}`);
    }
    
    
    return {
        isLoading,
        error,
        data,
        ok,
        registerCategory,
        registerCategoryEdited,
        getCategories
    };

    
    
}