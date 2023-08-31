
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import {
    IFormTournament,
    ITournamentDataGetAllResponse,
    ITournamentDataGetResponse,
    ITournamentDataWriteResponse,
} from "interfaces/ITournament";


export default function useFetchTournament() {

    const { getCookieToken } = useCookiesSession();
    const fetch = useFetchData();


    const createTournament = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        tournamentCreated: fetch.data as ITournamentDataWriteResponse,
        create: (data: IFormTournament) => fetch.fetchData(Requests.createTournament(data, getCookieToken()))
    };

    const editTournament = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        tournamentEdited: fetch.data as ITournamentDataWriteResponse,
        edit: (data: IFormTournament, id: string) => fetch.fetchData(Requests.editTournament(data, id, getCookieToken()))
    };


    const getTournament = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        tournament: fetch.data as ITournamentDataGetResponse,
        get: (id: string) => fetch.fetchData(Requests.getTournament(id, getCookieToken()))
    };


    const getAllTournaments = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        tournaments: fetch.data as ITournamentDataGetAllResponse,
        getAll: () => fetch.fetchData(Requests.getTournaments(getCookieToken()))
    };


    return {
        createTournament,
        editTournament,
        getTournament,
        getAllTournaments,
    }

}