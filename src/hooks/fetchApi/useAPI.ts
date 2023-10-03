
import useCookiesSession from "../useCookiesSession";
import { useCallback, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { IError } from "interfaces/IError";

export type Curried<R> = (cookie: string) => Promise<AxiosResponse<R, any>>;

export default function useAPI<R, Props extends ReadonlyArray<unknown>>(funcFetch: (...params: Props) => Curried<R>) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ok, setOk] = useState<boolean>(false);
    const [data, setData] = useState<R>([{}] as R);
    const { getCookieToken } = useCookiesSession();

    const hof = useCallback(async (...args: Props) => {
        setIsLoading(true);
        try {
            let res = await funcFetch(...args)(getCookieToken());
            setData(res.data);
            setIsLoading(false);
            setOk(true);
        } catch (error: unknown) {
            let err = error as AxiosError<IError>;
            setIsLoading(false);
            console.error(err.response?.data.error)
        }
    }, [funcFetch, getCookieToken])

    return {
        isLoading,
        ok,
        data,
        fetch: hof
    }
}
