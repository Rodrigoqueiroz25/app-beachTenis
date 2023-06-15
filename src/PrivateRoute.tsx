
import { Navigate } from "react-router-dom";
import useCookiesSession from "./hooks/useCookiesSession";


type Props = {
    children: JSX.Element;
}

export function PrivateRoute({ children }: Props){
    
    const { cookiesSessionExists } = useCookiesSession();
    
    if (cookiesSessionExists()) {
        return children;
    }
    else{
        return <Navigate to={'/login'}/>;
    }
    
}