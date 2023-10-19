
import { Curried } from "hooks/fetchApi/useAPI";
import http from "./http-common"
import { AthleteRegistration } from "models/AthleteRegistration";
import { Team } from "models/Team";


const registerTeam = (categoryId: number, athletesId: string): Curried<AthleteRegistration[]> => {
    return (cookies: string) => {
        return http.post<AthleteRegistration[]>(`/registerTeam`, {categoryId, athletesId}, {
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

const registerPlayer = (categoryId: number): Curried<AthleteRegistration> => {
    return (cookies: string) => {
        return http.post<AthleteRegistration>(`/registerTeam`, {categoryId}, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return AthleteRegistration.mapDataRemote(res);
            }],
        })
    }
}

const remove = (teamId: number): Curried<any> => {
    return (cookies: string) => {
        return http.post<any>(`/registerTeam`,{
            headers: {
                'x-access-token': `${cookies}`
            },
        })
    }
}

const getAll = (categoryId: number): Curried<Team[]> => {
    return (cookies: string) => {
        return http.get<Team[]>(`/teamsRegisteredByCategory?categoryId=${categoryId}`, {
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
    registerTeam,
    registerPlayer,
    remove
}


