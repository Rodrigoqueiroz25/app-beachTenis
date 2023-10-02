
import { ForgotPasswd } from "./PreLogged/ForgotPasswd";
import { CreatePasswd } from "./PreLogged/CreatePasswd";
import { CreateTournament } from "./PostLogged/CreateTournament";
import { EditProfile } from "./PostLogged/EditProfile";
import { ListTournaments } from "./PostLogged/ListTournaments";
import { Tournament } from "./PostLogged/Tournament/Tournament";
import { Login } from "./PreLogged/Login";
import { CreateCategory } from "./PostLogged/CreateCategory";
import { EditCategory } from "./PostLogged/EditCategory";
import { EditTournament } from "./PostLogged/EditTournament";
import { CreateTournamentSponsor } from "./PostLogged/CreateTournamentSponsor";
import { EditTournamentSponsor } from "./PostLogged/EditTournamentSponsor";
import { Home } from "./PostLogged/Home";
import { RegisterPlayerCategory } from "./PostLogged/RegisterPlayerCategory";
import { SignUp } from './PreLogged/SignUp/SignUp';
import { PrivateRoute } from "PrivateRoute";


function privateRoute(Comp: JSX.Element){
    return <PrivateRoute>{Comp}</PrivateRoute>
}

const pagesPreLogged = {
    Login: <Login/>,
    SignUp: <SignUp/>,
    ForgotPasswd: <ForgotPasswd/>,
    CreatePasswd: <CreatePasswd/>
}

const pagesPosLogged = {
    Home: <Home/>,
    EditProfile: <EditProfile/>,
    ListTournaments: <ListTournaments/>,
    Tournament: <Tournament/>,
    CreateTournament: <CreateTournament/>,
    EditTournament: <EditTournament/>,
    CreateTournamentSponsor: <CreateTournamentSponsor/>,
    EditTournamentSponsor: <EditTournamentSponsor/>,
    CreateCategory: <CreateCategory/>,
    EditCategory: <EditCategory/>,
    RegisterPlayerCategory: <RegisterPlayerCategory/>
}


function preLogged<P1 extends keyof typeof pagesPreLogged>(prop1: P1) {
    let Component = pagesPreLogged[prop1];
    return Component
}

function posLogged<P1 extends keyof typeof pagesPosLogged>(prop1: P1) {
    let Component = pagesPosLogged[prop1];
    return  privateRoute(Component)
}

export const Pages = { 
    preLogged, 
    posLogged 
};
