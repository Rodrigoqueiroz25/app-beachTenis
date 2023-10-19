
import { TournamentFetchService } from "services/TournamentService";
import { CategoryFetchService } from "services/CategoryService";
import { TournamentSponsorFetchService } from "services/TournamentSponsorService";
import useAPI, { Curried } from "./useAPI";
import { UserAccountFetchService } from "services/UserAccountService";
import { TeamFetchService } from "services/TeamService";
import { CityFetchService } from "services/CityService";
import { SportFetchService } from "services/SportService";

type Unwrap<T> = T extends (...params: any) => Curried<infer S> ? S : never;


const methods = {
    'tournament': {
        'get': TournamentFetchService.get,
        'getAll': TournamentFetchService.getAll,
        'create': TournamentFetchService.create,
        'update': TournamentFetchService.update
    },
    'category': {
        'getAll': CategoryFetchService.getAll,
        'create': CategoryFetchService.create,
        'update': CategoryFetchService.update,
        'remove': CategoryFetchService.remove,
        'registerTeam': TeamFetchService.registerTeam,
        'registerPlayerSingle': TeamFetchService.registerPlayer,
        'getRegisteredTeams': TeamFetchService.getAll
    },
    'tournamentSponsor': {
        'create': TournamentSponsorFetchService.create,
        'getAll': TournamentSponsorFetchService.getAll,
        'update': TournamentSponsorFetchService.update,
        'remove': TournamentSponsorFetchService.remove
    },
    'userAccount': {
        'getYourSelf': UserAccountFetchService.getByToken,
        'getOtherByName': UserAccountFetchService.getByName,
        'updateYourSelf': UserAccountFetchService.update,
        'signup': UserAccountFetchService.create,
    },
    'city': {
        'getAll': CityFetchService.getAll
    },
    'sport': {
        'getAll': SportFetchService.getAll
    }

}

export function useSelectorMethodFetch() {

    function useGet<
        P1 extends keyof typeof methods,
        P2 extends keyof typeof methods[P1]
    >(prop1: P1, prop2: P2): {
        isLoading: boolean,
        ok: boolean,
        data: Unwrap<typeof methods[P1][P2]>;
        fetch: (...x: Parameters<typeof methods[P1][P2] extends (...params: infer Props) => Curried<any> ? (...x: Props) => Promise<void> : never>) => Promise<void>
    };

    function useGet(...props: string[]) {
        return useAPI(methods[props[0]][props[1]]);
    }

    return { selector: useGet }
}

