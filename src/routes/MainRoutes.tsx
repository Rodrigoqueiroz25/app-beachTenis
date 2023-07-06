import { Navigate, useRoutes } from "react-router-dom";
import { PrivateRoute } from "@/PrivateRoute";
import { ContextSignupProvider } from "@/contexts/ContextSignup";

import { Routes } from "@/enums/routes.enum";
import { Pages } from "@/pages";


export function MainRoutes(){
    
    return useRoutes([
        { path: Routes.root, element: <Navigate to={Routes.login}/> },
        { path: Routes.login, element: <Pages.Login/>},
        { path: Routes.signup, element: <ContextSignupProvider><Pages.Signup.CreateUser/></ContextSignupProvider> },
        { path: Routes.createUser, element: <ContextSignupProvider><Pages.Signup.CreateUser/></ContextSignupProvider> },
        { path: Routes.createProfile, element: <ContextSignupProvider><Pages.Signup.CreateProfile/></ContextSignupProvider> },
        { path: Routes.forgotPasswd, element: <Pages.RecoveryPasswd.ForgotPasswd/>},
        { path: Routes.createPasswd, element: <Pages.RecoveryPasswd.CreatePasswd/> },
        { path: Routes.addTournament, element: <PrivateRoute><Pages.AddTournament/></PrivateRoute> },
        { path: Routes.addTournamentSponsor, element: <PrivateRoute><Pages.AddTournamentSponsor/></PrivateRoute> },
        { path: Routes.addCategories, element: <PrivateRoute><Pages.AddCategories/></PrivateRoute> },
        { path: Routes.listTournaments, element: <PrivateRoute><Pages.ListTournaments/></PrivateRoute> },
        { path: Routes.tournament, element: <PrivateRoute><Pages.Tournament/></PrivateRoute> },
        { path: Routes.home, element: <PrivateRoute><Pages.Home/></PrivateRoute> },
        { path: Routes.editProfile, element: <PrivateRoute><Pages.Profile/></PrivateRoute> },
        { path: Routes.null, element: <h1>sds</h1> },
    ]);

}