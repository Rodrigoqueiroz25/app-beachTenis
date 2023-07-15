import { ForgotPasswd } from "./PreLogged/ForgotPasswd";
import { CreatePasswd } from "./PreLogged/CreatePasswd";
import { CreateProfile } from "./PreLogged/SignUp/CreateProfile";
import { CreateUser } from "./PreLogged/SignUp/CreateUser";
import { Home } from "./PostLogged/Home/Home";
import { FormTournament } from "./PostLogged/FormTournament";
import { FormTournamentSponsor } from "./PostLogged/FormTournamentSponsor";
import { EditProfile } from "./PostLogged/EditProfile";
import { ListTournaments } from "./PostLogged/ListTournaments";
import { TournamentContainer } from "./PostLogged/Tournament/TournamentContainer";
import { Login } from "./PreLogged/Login";
import { CreateCategory } from "./PostLogged/CreateCategory";
import { EditCategory } from "./PostLogged/EditCategory";

export const Pages = {
    Login: Login,
    Signup: {CreateUser, CreateProfile},
    RecoveryPasswd: {ForgotPasswd, CreatePasswd},

    Home: Home,
    EditProfile: EditProfile,
    ListTournaments: ListTournaments,
    Tournament: TournamentContainer,
    FormTournament: FormTournament,
    FormTournamentSponsor: FormTournamentSponsor,

    CreateCategory: CreateCategory,
    EditCategory: EditCategory,

}
