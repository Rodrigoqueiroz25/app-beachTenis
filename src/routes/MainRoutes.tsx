import { useRoutes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { RegisterUser } from "../pages/RegisterUser/RegisterUser";
import { ForgotPasswd } from "../pages/ForgotPasswd/ForgotPasswd";
import { CreatePasswd } from "../pages/CreatePasswd/CreatePasswd";
import { CreateProfile } from "../pages/CreateProfile/CreateProfile";
import { Home } from "../pages/Home/Home";


export function MainRoutes(){
    return useRoutes([
        { path: '/login', element: <Login/>},
        { path: '/register-user', element: <RegisterUser/> },
        { path: '/forgot-password', element: <ForgotPasswd/>},
        { path: '/create-password', element: <CreatePasswd/> },
        { path: '/create-profile', element: <CreateProfile/> },
        { path: '/home', element: <Home/> }
    ]);

}