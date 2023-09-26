
import { useState } from "react";
import { AuthService, DataLogin } from "services/AuthService";
import { AxiosError } from "axios";
import { IError } from "interfaces/IError";
import useCookiesSession from "../useCookiesSession";

export default function useAuth() {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [error, setError] = useState('');
    const { setCookiesSession, cookiesSessionExists, removeCookiesSession } = useCookiesSession();


    async function login(data: DataLogin) {
        setIsLoading(true);
        try {
            const res = await AuthService.login(data);
            if (res.status === 200) {
                setCookiesSession(res.data.accessToken, res.data.name, res.data.isAdmin);
            }
            setIsLoading(false);
        } catch (error: unknown) {
            let err = error as AxiosError<IError>;
            setIsLoading(false);
            setError(err.response?.data.error as string)
            console.error(err.response?.data.error)
        }
    }

    function isAuth(){
        if (cookiesSessionExists()) {
            return true;
        }
        else{
            return false;
        }
    }

    function logout(){
        removeCookiesSession();
    }

    return {
        isLoading, login, error, isAuth, logout
    }
   
}