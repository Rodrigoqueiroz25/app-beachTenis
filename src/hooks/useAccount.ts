
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import useAuth from "./useAuth";
import useSignup from "./useSignup";
import { IUserAccount } from "interfaces/IUserAccount";
import { IDataLogin } from "interfaces/IDataLogin";
import { IDataSignUp } from "interfaces/IDataSignUp";


export default function useAccount() {

    const { getCookieToken } = useCookiesSession();

    const login = useAuth();
    const signup = useSignup();
    const account = useFetchData<IUserAccount>();


    const authenticate = {
        isLoading: login.isLoading,
        ok: login.isAuth,
        error: login.error,
        login: (data: IDataLogin) => login.authenticate(Requests.login(data))
    };

    const updateAccount = {
        isLoading: account.isLoading,
        ok: account.ok,
        error: account.error,
        accountUpdated: account.data,
        update: (data: IUserAccount, id: string) => account.fetchData(Requests.updateUser(data, id, getCookieToken()))
    };


    const getAccount = {
        isLoading: account.isLoading,
        ok: account.ok,
        error: account.error,
        account: account.data,
        get: () => account.fetchData(Requests.getUserByToken(getCookieToken()))
    };


    const register = {
        isLoading: signup.isLoading,
        ok: signup.ok,
        error: signup.error,
        signup: (data: IDataSignUp) => signup.signup(Requests.signup(data))
    };


    return {
        authenticate,
        register,
        getAccount,
        updateAccount
    }

}