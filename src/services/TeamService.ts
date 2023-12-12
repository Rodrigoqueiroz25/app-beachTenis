
import { Curried } from "hooks/fetchApi/useAPI";
import http from "./http-common"
import { AthleteRegistration } from "models/AthleteRegistration";
import { Team } from "models/Team";
import { INotContent } from "interfaces/INotContent";


const registerTeam = (categoryId: number, athletesId: string): Curried<AthleteRegistration[]> => {
    return (cookies: string) => {
        return http.post<AthleteRegistration[]>(`/registerTeam`, { categoryId, athletesId }, {
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
        return http.post<AthleteRegistration>(`/registerTeam`, { categoryId }, {
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

const removeTeam = (teamId: number): Curried<any> => {
    return (cookies: string) => {
        return http.delete<any>(`/registerTeam/${teamId}`, {
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

const getTeamIdPlayerLoggedByCategory = (categoryId: number): Curried<number> => {
    return (cookies: string) => {
        return http.get<number>(`/teamsRegisteredByCategory?categoryId=${categoryId}`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = Team.mapArrayDataRemote(JSON.parse(data));
                let id = 0;
                res.forEach(team => {
                    team.athletes.forEach(athlete => {
                        if (athlete.canDeleted) {
                            id = team.id;
                        }
                    });
                });
                return id;
            }],
        })
    }
}


export const TeamFetchService = {
    getAll,
    registerTeam,
    registerPlayer,
    removeTeam,
    getTeamIdPlayerLoggedByCategory
}


