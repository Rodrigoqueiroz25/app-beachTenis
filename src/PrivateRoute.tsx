import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


type Props = {
    children: JSX.Element;
}

export function PrivateRoute({ children }: Props){
    
    const isAuth = true;
    
    if (isAuth) {
        return children;
    }
    else{
        return <Navigate to={'/login'}/>;
    }
    
}