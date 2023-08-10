
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import { IRegistrationGetResponse, IRegistrationPostResponse } from "interfaces/IRegistrations";


export default function useRegisterPlayerCategory() {

    const { getCookieToken } = useCookiesSession();

    const get = useFetchData<IRegistrationGetResponse[]>();
    const post = useFetchData<IRegistrationPostResponse>();
    

    const getPlayersRegisteredByCategory = {
        isLoading: get.isLoading,
        ok: get.ok,
        error: get.error,
        playersRecords: get.data,
        get: (categoryId: string) => get.fetchData(Requests.getPlayersRegisteredCategory(categoryId, getCookieToken()))
    };

    const registerPlayerInCategory = {
        isLoading: post.isLoading,
        ok: post.ok,
        error: post.error,
        recordCreated: post.data,
        register: (categoryId: string, athletesId: string) => post.fetchData(Requests.registerPlayerCategory({categoryId, athletesId}, getCookieToken()))
    };


    return {
        getPlayersRegisteredByCategory,
        registerPlayerInCategory
    }

}