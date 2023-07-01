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
import { Routes } from "@/enums/routes.enum";


export function MainRoutes(){
    
    return useRoutes([
        { path: Routes.root, element: <Navigate to="/login"/> },
        { path: Routes.login, element: <Login/>},
        { path: Routes.signup, element: <ContextSignupProvider><CreateUser/></ContextSignupProvider> },
        { path: Routes.createUser, element: <ContextSignupProvider><CreateUser/></ContextSignupProvider> },
        { path: Routes.createProfile, element: <ContextSignupProvider><CreateProfile/></ContextSignupProvider> },
        { path: Routes.forgotPasswd, element: <ForgotPasswd/>},
        { path: Routes.createPasswd, element: <CreatePasswd/> },
        { path: Routes.addTournament, element: <PrivateRoute><AddTournament/></PrivateRoute> },
        { path: Routes.addCategories, element: <PrivateRoute><AddCategories/></PrivateRoute> },
        { path: Routes.listTournaments, element: <PrivateRoute><ListTournaments/></PrivateRoute> },
        { path: Routes.tournament, element: <PrivateRoute><Tournament/></PrivateRoute> },
        { path: Routes.home, element: <PrivateRoute><Home/></PrivateRoute> },
        { path: Routes.null, element: <h1>sds</h1> },
    ]);

}