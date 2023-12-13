
import useCookiesSession from "../useCookiesSession";
import { useCallback, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { IError } from "interfaces/IError";

export type Curried<R> = (cookie: string) => Promise<AxiosResponse<R, any>>;

export default function useAPI<R, Props extends ReadonlyArray<unknown>>(funcFetch: (...params: Props) => Curried<R>) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, setState] = useState('idle');
    const [ok, setOk] = useState<boolean>(false);
    const [data, setData] = useState<R>([{}] as R);
    const { getCookieToken } = useCookiesSession();

    
    const reset = useCallback(() => {
        setData([{}] as R);
        setIsLoading(false);
        setOk(false);
        setState('idle');
    },[]);

    const hof = useCallback(async (...args: Props) => {
        reset();
        setIsLoading(true);
        try {
            let res = await funcFetch(...args)(getCookieToken());
            setData(res.data);
            setIsLoading(false);
            setOk(true);
            setState('done');
        } catch (error: unknown) {
            let err = error as AxiosError<IError>;
            setIsLoading(false);
            setState('done');
            console.error(err.response?.data.error)
        }
    }, [funcFetch, getCookieToken, reset]);


    return {
        isLoading,
        ok,
        data,
        state,
        fetch: hof,
    }
}
