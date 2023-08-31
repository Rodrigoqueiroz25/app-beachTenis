
import { useEffect } from "react";
import useFetchData from "./useFetchData";
import { Requests } from "helper/Requests";
import useCookiesSession from "./useCookiesSession";
import { ISport } from "interfaces/ISport";


export default function useGetSports() {

    const { fetchData, data, isLoading, ok, error } = useFetchData();
    const { getCookieToken } = useCookiesSession();

    useEffect(() => {
        fetchData(Requests.getSports(getCookieToken()));
    }, [error]);

    return {
        isLoading,
        ok,
        error,
        sports: data as ISport[]
    }

}