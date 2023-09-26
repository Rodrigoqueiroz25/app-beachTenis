import { ForgotPasswd } from "./PreLogged/ForgotPasswd";
import { CreatePasswd } from "./PreLogged/CreatePasswd";

import { CreateTournament } from "./PostLogged/CreateTournament";
import { EditProfile } from "./PostLogged/EditProfile";
import { ListTournaments } from "./PostLogged/ListTournaments";
import { TournamentContainer } from "./PostLogged/Tournament/TournamentContainer";
import { Login } from "./PreLogged/Login";
import { CreateCategory } from "./PostLogged/CreateCategory";
import { EditCategory } from "./PostLogged/EditCategory";
import { EditTournament } from "./PostLogged/EditTournament";
import { CreateTournamentSponsor } from "./PostLogged/CreateTournamentSponsor";
import { EditTournamentSponsor } from "./PostLogged/EditTournamentSponsor";
import { Home } from "./PostLogged/Home";
import { RegisterPlayerCategory } from "./PostLogged/RegisterPlayerCategory";
import { SignUp } from './PreLogged/SignUp/SignUp';

export const Pages = {
    Login: Login,
    SignUp: SignUp,
    RecoveryPasswd: {ForgotPasswd, CreatePasswd},

    Home: Home,
    EditProfile: EditProfile,
    ListTournaments: ListTournaments,
    Tournament: TournamentContainer,
    CreateTournament: CreateTournament,
    EditTournament: EditTournament,
    CreateTournamentSponsor: CreateTournamentSponsor,
    EditTournamentSponsor: EditTournamentSponsor,

    CreateCategory: CreateCategory,
    EditCategory: EditCategory,
    RegisterPlayerCategory: RegisterPlayerCategory

}
