
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// type StatusFetch = {
//     isLoading: boolean;
//     ok: boolean;
// }

type Redirect = {
    redirect: boolean;
    to: string;
    state?: object;
}

// type Props = {
//     statusGet?: StatusFetch;
//     statusFetch?: StatusFetch;
//     redirect?: Redirect;
//     children: JSX.Element[];
// }

type Props = {
    isLoading: boolean;
    dataGetted?: boolean;
    shouldRedirect?: Redirect;
    children: JSX.Element;
}

export function StateFetchHandle({ isLoading, dataGetted, shouldRedirect, children }: Props) {


    if (isLoading) {
        return <p>Loading</p>;
    }

    else if (shouldRedirect && shouldRedirect.redirect) {
        return <Navigate to={shouldRedirect.to} state={shouldRedirect.state} replace={true}/>
    }

    else {
        if (dataGetted === undefined || dataGetted === true) {
            return children
        }
        else {
            return <p>Erro</p>;
        }
    }

    // useEffect(() => {
    //     console.log(isLoading, shouldRedirect?.redirect, dataGetted)
    // }, [])

    // return (
    //     <>
    //         {
    //             isLoading
    //                 ? <p>Loading</p>
    //                 : shouldRedirect && shouldRedirect.redirect
    //                     ?
    //                     <Navigate to={shouldRedirect.to} state={shouldRedirect.state} />
    //                     :
    //                     dataGetted === undefined || dataGetted === true
    //                         ? children
    //                         : <p>Erro</p>
    //         }
    //     </>
    // );

}
