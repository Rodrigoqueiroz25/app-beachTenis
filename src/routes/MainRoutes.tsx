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
        { path: Routes.createTournament, element: <PrivateRoute><Pages.CreateTournament/></PrivateRoute> },
        { path: Routes.editTournament, element: <PrivateRoute><Pages.EditTournament/></PrivateRoute> },
        { path: Routes.listTournaments, element: <PrivateRoute><Pages.ListTournaments/></PrivateRoute> },
        { path: Routes.tournament, element: <PrivateRoute><Pages.Tournament/></PrivateRoute> },
        { path: Routes.home, element: <PrivateRoute><Pages.Home/></PrivateRoute> },
        { path: Routes.editProfile, element: <PrivateRoute><Pages.EditProfile/></PrivateRoute> },
        { path: Routes.null, element: <h1>sds</h1> },
        { path: Routes.createCategory, element: <PrivateRoute><Pages.CreateCategory/></PrivateRoute> },
        { path: Routes.editCategory, element: <PrivateRoute><Pages.EditCategory/></PrivateRoute> },
        { path: Routes.createTournamentSponsor, element: <PrivateRoute><Pages.CreateTournamentSponsor/></PrivateRoute> },
        { path: Routes.editTournamentSponsor, element: <PrivateRoute><Pages.EditTournamentSponsor/></PrivateRoute> },
    ]);

}