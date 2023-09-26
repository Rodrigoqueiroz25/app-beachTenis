/* eslint-disable react-hooks/exhaustive-deps */

import { TournamentFetchService } from "services/TournamentService";
import useAPI from "./useAPI";
import { CategoryFetchService } from "services/CategoryService";
import { TournamentSponsorFetchService } from "services/TournamentSponsorService";
import { UserAccountFetchService } from "services/UserAccountService";
import { TeamFetchService } from "services/TeamService";
import { getValueProperty } from "functions/getValueProperty";
import { CityFetchService } from "services/CityService";
import { SportFetchService } from "services/SportService";


export function useSelectorMethodFetch() {

    const methods = {
        'tournament': {
            'get': useAPI(TournamentFetchService.get),
            'getAll': useAPI(TournamentFetchService.getAll),
            'create': useAPI(TournamentFetchService.create),
            'update': useAPI(TournamentFetchService.update)
        },
        'category': {
            'getAll': useAPI(CategoryFetchService.getAll),
            'create': useAPI(CategoryFetchService.create),
            'update': useAPI(CategoryFetchService.update),
            'remove': useAPI(CategoryFetchService.remove),
            'registerTeam': useAPI(TeamFetchService.register),
            'getRegisteredTeams': useAPI(TeamFetchService.getAll)
        },
        'tournamentSponsor': {
            'create': useAPI(TournamentSponsorFetchService.create),
            'getAll': useAPI(TournamentSponsorFetchService.getAll),
            'update': useAPI(TournamentSponsorFetchService.update),
            'remove': useAPI(TournamentSponsorFetchService.remove)
        },
        'userAccount': {
            'getYourSelf': useAPI(UserAccountFetchService.getByToken),
            'getOtherByName': useAPI(UserAccountFetchService.getByName),
            'updateYourSelf': useAPI(UserAccountFetchService.update),
            'signup': useAPI(UserAccountFetchService.create),
        },
        'city': {
            'getAll': useAPI(CityFetchService.getAll)
        },
        'sport': {
            'getAll': useAPI(SportFetchService.getAll)
        }

    }
    
    return { selector: getValueProperty(methods) }  
}







