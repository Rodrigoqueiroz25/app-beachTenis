export type TLogado = {
    accessToken: string;
    name: string;
}

export type dataLogin = {
    msg: string;
    token?: string;
    name_user?: string;
}

export type City = {
    area: string;
    codeIbge: number;
    deleted: boolean;
    gentilic?: string;
    id: number;
    name: string;
    stateId: number;
}