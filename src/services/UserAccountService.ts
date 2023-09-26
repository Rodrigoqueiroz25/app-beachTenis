/* eslint-disable @typescript-eslint/no-redeclare */

import http from "./http-common"
import { Curried } from "hooks/fetchApi/useAPI";
import { UserAccount, UserAccountSendCreate, UserAccountSendUpdate } from "models/UserAccount";


const getByToken = (): Curried<UserAccount> => {
    return (cookies: string) => {
        return http.get<UserAccount>(`/account/loadByToken`,
            {
                headers: {
                    'x-access-token': `${cookies}`
                },
                transformResponse: [(data) => {
                    let res = JSON.parse(data);
                    return UserAccount.mapDataRemote(res);
                }],
            })
    }
}

const getByName = (name: string): Curried<UserAccount[]> => {
    return (cookies: string) => {
        return http.get<UserAccount[]>(`/account/loadByName?name=${name}`, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return UserAccount.mapArrayDataRemote(res);
            }],
        })
    }
}

const create = (data: UserAccountSendCreate): Curried<unknown> => {
    return (cookies: string) => {
        return http.post<unknown>('/signup', data);
    }
}

const update = (data: UserAccountSendUpdate, id: number): Curried<UserAccount> => {
    return (cookies: string) => {
        return http.put<UserAccount>(`/account/${id}`, data, {
            headers: {
                'x-access-token': `${cookies}`
            },
            transformResponse: [(data) => {
                let res = JSON.parse(data);
                return UserAccount.mapDataRemote(res);
            }],
        })
    }
}


export const UserAccountFetchService = {
    getByName,
    getByToken,
    update,
    create
}


