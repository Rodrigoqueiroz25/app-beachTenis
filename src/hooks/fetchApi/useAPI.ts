
import useCookiesSession from "../useCookiesSession";
import { useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { IError } from "interfaces/IError";

export type Curried<R> = (cookie: string) => Promise<AxiosResponse<R, any>>;

export default function useAPI<R, Props extends ReadonlyArray<unknown>>(funcFetch: (...params: Props) => Curried<R>) {

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [ok, setOk] = useState<Boolean>(false);
    const [data, setData] = useState<R>([{}] as R);
    const { getCookieToken } = useCookiesSession();

    async function hof(...args: Props){
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
    }

    return {
        isLoading,
        ok,
        data,
        fetch: hof
    }
}

// export default function useDecorator<T extends (...args: [...any]) => any>(func: T) {

//     const [isLoading, setIsLoading] = useState<Boolean>(false);
//     const [ok, setOk] = useState<Boolean>(false);
//     const [datas, setData] = useState<Awaited<ReturnType<T>>>();
//     //const { getCookieToken } = useCookiesSession();

//     async function decorator(...args: Parameters<T> ){
//         setIsLoading(true);
//         try {
//             let res = await func(...([...args] as const));
//             setData(res);
//             setIsLoading(false);
//             setOk(true);
//             //return res;
//         } catch (error: unknown) {
//             let err = error as AxiosError<IError>;
//             setIsLoading(false);
//             console.error(err.response?.data.error)
//         }
//     }

    
//     return {
//         isLoading,
//         ok,
//         datas,
//         func: decorator
//         //decorator,
//     }

    


// }