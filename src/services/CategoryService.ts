
import { Category, CategorySend } from "models/Category";
import http from "./http-common"
import { Curried } from "hooks/fetchApi/useAPI";


const getAll = (idTournamentLinked: number): Curried<Category[]> => {
    return (cookies: string) => {
        return http.get<Category[]>(`/category/loadByTournament?tournamentId=${idTournamentLinked}`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Category.mapArrayDataRemote(res);
            }],
        })
    }
}

const create = (data: CategorySend): Curried<Category> => {
    return (cookies: string) => {
        return http.post<Category>('/category', data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Category.mapDataRemote(res);
            }],
        })
    }
}

const update = (data: CategorySend, id: number): Curried<Category> => {
    return (cookies: string) => {
        return http.put<Category>(`/category/${id}`, data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return Category.mapDataRemote(res);
            }],
        })
    }
}


const remove = (id: number): Curried<any> => {
    return (cookies: string) => {
        return http.delete<any>(`/category/${id}`, {
            headers: {
                'x-access-token': `${cookies}`
            }
        })
    }
}


export const CategoryFetchService = {
    getAll,
    update,
    create,
    remove
}


