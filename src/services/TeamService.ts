
import { Curried } from "hooks/fetchApi/useAPI";
import http from "./http-common"
import { AthleteRegistration } from "models/AthleteRegistration";
import { Team } from "models/Team";


const register = (categoryId: number, athletesId: string): Curried<AthleteRegistration[]> => {
    return (cookies: string) => {
        return http.post<AthleteRegistration[]>(`/registrations`, {categoryId, athletesId}, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return AthleteRegistration.mapArrayDataRemote(res);
            }],
        })
    }
}

const getAll = (categoryId: number): Curried<Team[]> => {
    return (cookies: string) => {
        return http.get<Team[]>(`/registrations/loadByCategory?categoryId=${categoryId}`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Team.mapArrayDataRemote(res);
            }],
        })
    }
}

export const TeamFetchService = {
    getAll,
    register
}


