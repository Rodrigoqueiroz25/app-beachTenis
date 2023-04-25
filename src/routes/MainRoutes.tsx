import { useRoutes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { RegisterUser } from "../pages/RegisterUser/RegisterUser";
import { ForgotPasswd } from "../pages/ForgotPasswd/ForgotPasswd";
import { CreatePasswd } from "../pages/CreatePasswd/CreatePasswd";


export function MainRoutes(){
    return useRoutes([
        { path: '/login', element: <Login/>},
        { path: '/register-user', element: <RegisterUser/> },
        { path: '/forgot-password', element: <ForgotPasswd/>},
        { path: '/create-password', element: <CreatePasswd/> }
    ]);

}