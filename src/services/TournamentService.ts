/* eslint-disable @typescript-eslint/no-redeclare */


import http from "./http-common"
import { Tournament, TournamentSend } from 'models/Tournament'
import { Curried } from "hooks/fetchApi/useAPI";

export type Tour = {
    opened: Tournament[],
    finished: Tournament[]
}


const getAll = (): Curried<Tour> => {
    return (cookies: string) => {
        return http.get<Tour>(`/tournaments/filterDate`,
            {
                headers: {
                    'x-access-token': `${cookies}`
                },
                transformResponse: [(data) => {
                    let res = JSON.parse(data);
                    return Tournament.mapDataArrayRemote(res);
                }],
            })
    }
}

const get = (idTour: number): Curried<Tournament> => {
    return (cookies: string) => {
        return http.get<Tournament>('/tournament/loadById', {
            headers: {
                'x-access-token': `${cookies}`
            },
            params: {
                id: idTour
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Tournament.mapDataRemote(res);
            }],
        })
    }
}

const create = (data: TournamentSend): Curried<Tournament> => {
    return (cookies: string) => {
        return http.post<Tournament>('/tournament', data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Tournament.mapDataRemote(res);
            }],
        })
    }
}

const update = (data: TournamentSend, id: number): Curried<Tournament> => {
    return (cookies: string) => {
        return http.put<Tournament>(`/tournament/${id}`, data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Tournament.mapDataRemote(res);
            }],
        })
    }
}


export const TournamentFetchService = {
    getAll,
    get,
    update,
    create
}



