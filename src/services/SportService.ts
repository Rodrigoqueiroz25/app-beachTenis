
import { Sport } from "models/Sport";
import http from "./http-common"
import { Curried } from "hooks/fetchApi/useAPI";


const getAll = (): Curried<Sport[]> => {
    return (cookies: string) => {
        return http.get<Sport[]>(`/sports`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Sport.mapArrayDataRemote(res);
            }],
        })
    }
}

export const SportFetchService = {
    getAll,
}


