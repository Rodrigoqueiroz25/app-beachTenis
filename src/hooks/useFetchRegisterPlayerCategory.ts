
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import { IRegistrationGetResponse, IRegistrationPostResponse } from "interfaces/IRegistrations";


export default function useFetchRegisterPlayerCategory() {

    const { getCookieToken } = useCookiesSession();
    const fetch = useFetchData();
    

    const getPlayersRegisteredByCategory = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        playersRecords: fetch.data as IRegistrationGetResponse[],
        get: (categoryId: string) => fetch.fetchData(Requests.getPlayersRegisteredCategory(categoryId, getCookieToken()))
    };

    const registerPlayerInCategory = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        recordCreated: fetch.data as IRegistrationPostResponse,
        register: (categoryId: string, athletesId: string) => fetch.fetchData(Requests.registerPlayerCategory({categoryId, athletesId}, getCookieToken()))
    };


    return {
        getPlayersRegisteredByCategory,
        registerPlayerInCategory
    }

}