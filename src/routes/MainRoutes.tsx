import { Navigate, useRoutes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { ForgotPasswd } from "../pages/ForgotPasswd/ForgotPasswd";
import { CreatePasswd } from "../pages/CreatePasswd/CreatePasswd";
// import { CreateProfile } from "../pages/SignUp/components/FormCreateProfile/FormCreateProfile";
import { Home } from "../pages/Home/Home";
import { PrivateRoute } from "../PrivateRoute";
import { SignUp } from "../pages/SignUp/SignUp";
import { ContextSignupProvider } from "../contexts/ContextSignup";
import { AddTournament } from "../pages/AddTournament/AddTournament";


export function MainRoutes(){
    
    return useRoutes([
        { path: '/', element: <Navigate to="/login"/> },
        { path: '/login', element: <Login/>},
        { path: '/signup', element: <ContextSignupProvider><SignUp/></ContextSignupProvider> },
        { path: '/forgot-password', element: <ForgotPasswd/>},
        { path: '/create-password', element: <CreatePasswd/> },
        { path: '/add-tournament', element: <AddTournament/> },
        { path: '/home', element: <PrivateRoute><Home/></PrivateRoute> },
        { path: '*', element: <h1>sds</h1> },
    ]);

}