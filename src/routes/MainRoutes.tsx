import { useRoutes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { RegisterUser } from "../pages/RegisterUser/RegisterUser";


export function MainRoutes(){
    return useRoutes([
        { path: '/login', element: <Login/>},
        { path: '/registerUser', element: <RegisterUser/> },
    ]);

}