
import { Curried } from "hooks/fetchApi/useAPI";
import http from "./http-common"
import { City } from "models/City";


const getAll = (): Curried<City[]> => {
    return (cookies: string) => {
        return http.get<City[]>(`/cities`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return City.mapArrayDataRemote(res);
            }],
        })
    }
}

export const CityFetchService = {
    getAll,
}


