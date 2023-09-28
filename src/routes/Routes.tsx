
import { Navigate, useRoutes } from "react-router-dom";
import { Routes } from "enums/routes.enum";
import { Pages } from "pages";


export function MainRoutes(){

    return useRoutes([
        { path: Routes.root, element: <Navigate to={Routes.login}/> },
        { path: Routes.login, element: Pages.preLogged('Login')},
        { path: Routes.signup, element: Pages.preLogged('SignUp') },
        { path: Routes.forgotPasswd, element: Pages.preLogged('ForgotPasswd')},
        { path: Routes.createPasswd, element: Pages.preLogged('CreatePasswd') },
        
        { path: Routes.createTournament, element: Pages.posLogged('CreateTournament') },
        { path: Routes.editTournament, element: Pages.posLogged('EditTournament') },
        { path: Routes.listTournaments, element: Pages.posLogged('ListTournaments') },
        { path: Routes.tournament, element: Pages.posLogged('Tournament') },
        { path: Routes.home, element: Pages.posLogged('Home')},
        { path: Routes.editProfile, element: Pages.posLogged('EditProfile') },
        { path: Routes.null, element: <h1>sds</h1> },
        { path: Routes.createCategory, element: Pages.posLogged('CreateCategory') },
        { path: Routes.editCategory, element: Pages.posLogged('EditCategory') },
        { path: Routes.createTournamentSponsor, element: Pages.posLogged('CreateTournamentSponsor') },
        { path: Routes.editTournamentSponsor, element: Pages.posLogged('EditTournamentSponsor') },
        { path: Routes.registerPlayerCategory, element: Pages.posLogged('RegisterPlayerCategory') },
    ]);

}