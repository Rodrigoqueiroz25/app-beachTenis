/* eslint-disable @typescript-eslint/no-redeclare */


import { TournamentSponsor, TournamentSponsorSend } from "models/TournamentSponsor";
import http from "./http-common"
import { Curried } from "hooks/fetchApi/useAPI";


const getAll = (idTournament: number): Curried<TournamentSponsor[]> => {
    return (cookies: string) => {
        return http.get<TournamentSponsor[]>(`/tournament-sponsor/load-by-tournament?tournamentId=${idTournament}`,
            {
                headers: {
                    'x-access-token': `${cookies}`
                },
                transformResponse: [(data) => {
                    let res = JSON.parse(data);
                    return TournamentSponsor.mapArrayDataRemote(res);
                }],
            })
    }
}


const create = (data: TournamentSponsorSend): Curried<TournamentSponsor> => {
    return (cookies: string) => {
        return http.post<TournamentSponsor>('/tournament-sponsor', data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return TournamentSponsor.mapDataRemote(res);
            }],
        })
    }
}

const update = (data: TournamentSponsorSend, id: number): Curried<TournamentSponsor> => {
    return (cookies: string) => {
        return http.put<TournamentSponsor>(`/tournament-sponsor/${id}`, data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return TournamentSponsor.mapDataRemote(res);
            }],
        })
    }
}

const remove = (id: number): Curried<any> => {
    return (cookies: string) => {
        return http.delete<any>(`/tournament-sponsor/${id}`, {
            headers: {
                'x-access-token': `${cookies}`
            }
        })
    }
}



export const TournamentSponsorFetchService = {
    getAll,
    update,
    create,
    remove
}


