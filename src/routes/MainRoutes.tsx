import { Navigate, useRoutes } from "react-router-dom";
import { ForgotPasswd } from "@/pages/ForgotPasswd/ForgotPasswd";
import { CreatePasswd } from "@/pages/CreatePasswd/CreatePasswd";
import { Home } from "@/pages/Home/Home";
import { PrivateRoute } from "@/PrivateRoute";
import { ContextSignupProvider } from "@/contexts/ContextSignup";
import { AddTournament } from "@/pages/AddTournament/AddTournament";
import { AddCategories } from "@/pages/AddCategories/AddCategories";
import { ListTournaments } from "@/pages/ListTournaments/ListTournaments";
import { Tournament } from "@/pages/Tournament/Tournament";
import { CreateUser } from "@/pages/SignUp/CreateUser/CreateUser";
import { CreateProfile } from "@/pages/SignUp/CreateProfile/CreateProfile";
import { Login } from "@/pages/Login/Login";


export function MainRoutes(){
    
    return useRoutes([
        { path: '/', element: <Navigate to="/login"/> },
        { path: '/login', element: <Login/>},
        { path: '/signup', element: <ContextSignupProvider><CreateUser/></ContextSignupProvider> },
        { path: '/signup/create-user', element: <ContextSignupProvider><CreateUser/></ContextSignupProvider> },
        { path: '/signup/create-profile', element: <ContextSignupProvider><CreateProfile/></ContextSignupProvider> },
        { path: '/forgot-password', element: <ForgotPasswd/>},
        { path: '/create-password', element: <CreatePasswd/> },
        { path: '/add-tournament', element: <PrivateRoute><AddTournament/></PrivateRoute> },
        { path: '/add-categories', element: <PrivateRoute><AddCategories/></PrivateRoute> },
        { path: '/list-tournaments', element: <PrivateRoute><ListTournaments/></PrivateRoute> },
        { path: '/tournament/:id', element: <PrivateRoute><Tournament/></PrivateRoute> },
        { path: '/home', element: <PrivateRoute><Home/></PrivateRoute> },
        { path: '*', element: <h1>sds</h1> },
    ]);

}