import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./services/Authentication";


type Props = {
    children: JSX.Element;
}

export function PrivateRoute({ children }: Props){
    
    const isAuth = isAuthenticated();
    
    if (isAuth) {
        return children;
    }
    else{
        return <Navigate to={'/login'}/>;
    }
    
}