import { useRoutes } from "react-router-dom";
import { Login } from "../pages/Login/Login";


export function MainRoutes(){
    return useRoutes([
        { path: '/login', element: <Login/>}
    ]);

}