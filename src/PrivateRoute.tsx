import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";


type Props = {
    children: JSX.Element;
}

export function PrivateRoute({ children }: Props){
    
    const [cookies, setCookies] = useCookies();
    
    if (cookies.user_session && cookies.user_name) {
        return children;
    }
    else{
        return <Navigate to={'/login'}/>;
    }
    
}