import { Navigate, useRoutes } from "react-router-dom";
import { PrivateRoute } from "@/PrivateRoute";
import { Routes } from "@/enums/routes.enum";
import { Pages } from "@/pages";


export function MainRoutes(){
    
    return useRoutes([
        { path: Routes.root, element: <Navigate to={Routes.login}/> },
        { path: Routes.login, element: <Pages.Login/>},
        { path: Routes.signup, element: <Pages.Signup.CreateUser/> },
        { path: Routes.createUser, element: <Pages.Signup.CreateUser/> },
        { path: Routes.createProfile, element: <Pages.Signup.CreateProfile/> },
        { path: Routes.forgotPasswd, element: <Pages.RecoveryPasswd.ForgotPasswd/>},
        { path: Routes.createPasswd, element: <Pages.RecoveryPasswd.CreatePasswd/> },
        { path: Routes.addTournament, element: <PrivateRoute><Pages.FormTournament/></PrivateRoute> },
        { path: Routes.addTournamentSponsor, element: <PrivateRoute><Pages.FormTournamentSponsor/></PrivateRoute> },
        { path: Routes.addCategories, element: <PrivateRoute><Pages.HandleCategories/></PrivateRoute> },
        { path: Routes.listTournaments, element: <PrivateRoute><Pages.ListTournaments/></PrivateRoute> },
        { path: Routes.tournament, element: <PrivateRoute><Pages.Tournament/></PrivateRoute> },
        { path: Routes.home, element: <PrivateRoute><Pages.Home/></PrivateRoute> },
        { path: Routes.editProfile, element: <PrivateRoute><Pages.EditProfile/></PrivateRoute> },
        { path: Routes.null, element: <h1>sds</h1> },
    ]);

}