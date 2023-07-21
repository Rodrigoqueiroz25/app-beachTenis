
import { useEffect } from "react";
import useFetchData from "./useFetchData";
import { ICity } from "@/interfaces/ICity";
import { Requests } from "@/helper/Requests";
import useCookiesSession from "./useCookiesSession";


export default function useCities() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ICity[]>();
    const { getCookieToken } = useCookiesSession();

    useEffect(() => {
        fetchData(Requests.getCities(getCookieToken()));
    }, [error]);

    return {
        isLoading,
        ok,
        error,
        cities: data as ICity[]
    }

}