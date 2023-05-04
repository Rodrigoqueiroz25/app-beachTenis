import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";


type Props = {
    children: JSX.Element;
}

export function PrivateRoute({ children }: Props){
    
    const [cookies, setCookies] = useCookies();
    
    //the token needed validate
    if (cookies.user_session) {
        return children;
    }
    else{
        return <Navigate to={'/login'}/>;
    }
    
}