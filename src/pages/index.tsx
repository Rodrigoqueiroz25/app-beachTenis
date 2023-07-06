import { ForgotPasswd } from "./PreLogged/ForgotPasswd/ForgotPasswd";
import { CreatePasswd } from "./PreLogged/CreatePasswd/CreatePasswd";
import { Login } from "./PreLogged/Login/Login";
import { CreateProfile } from "./PreLogged/SignUp/CreateProfile/CreateProfile";
import { CreateUser } from "./PreLogged/SignUp/CreateUser/CreateUser";
import { Home } from "./PostLogged/Home/Home";
import { ListTournaments } from "./PostLogged/ListTournaments/ListTournaments";
import { Tournament } from "./PostLogged/Tournament/Tournament";
import { AddCategories } from "./PostLogged/AddCategories/AddCategories";
import { AddTournament } from "./PostLogged/AddTournament/AddTournament";
import { AddTournamentSponsor } from "./PostLogged/AddTournamentSponsor/AddTournamentSponsor";
import { EditProfile } from "./PostLogged/EditProfile/EditProfile";

export const Pages = {
    Login: Login,
    Signup: {CreateUser, CreateProfile},
    RecoveryPasswd: {ForgotPasswd, CreatePasswd},

    Home: Home,
    Profile: EditProfile,
    ListTournaments: ListTournaments,
    Tournament: Tournament,
    AddCategories: AddCategories,
    AddTournament: AddTournament,
    AddTournamentSponsor: AddTournamentSponsor

}
