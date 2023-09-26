/* eslint-disable @typescript-eslint/no-redeclare */


import { AxiosResponse } from "axios";
import http from "./http-common"

export type DataLogin = {
    email: string,
    password: string
}

export type LoginResponse = {
    accessToken: string;
    name: string;
    isAdmin: string;
}


const login = (data: DataLogin): Promise<AxiosResponse<LoginResponse, any>> => {
    return http.post<LoginResponse>('/login', data);
}


export const AuthService = {
    login
}

