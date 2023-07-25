
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import {
    IFormTournament,
    ITournamentDataGetAllResponse,
    ITournamentDataGetByIdResponse,
    ITournamentDataWriteResponse
} from "interfaces/ITournament";


export default function useTournament() {

    const { getCookieToken } = useCookiesSession();

    const create = useFetchData<ITournamentDataWriteResponse>();
    const getAll = useFetchData<ITournamentDataGetAllResponse[]>();
    const get = useFetchData<ITournamentDataGetByIdResponse>();


    const createTournament = {
        isLoading: create.isLoading,
        ok: create.ok,
        error: create.error,
        tournamentCreated: create.data,
        create: (data: IFormTournament) => create.fetchData(Requests.createTournament(data, getCookieToken()))
    };

    const editTournament = {
        isLoading: create.isLoading,
        ok: create.ok,
        error: create.error,
        tournamentEdited: create.data,
        edit: (data: IFormTournament, id: string) => create.fetchData(Requests.editTournament(data, id, getCookieToken()))
    };


    const getTournament = {
        isLoading: get.isLoading,
        ok: get.ok,
        error: get.error,
        tournament: get.data,
        get: (id: string) => get.fetchData(Requests.getTournament(id, getCookieToken()))
    };


    const getAllTournaments = {
        isLoading: getAll.isLoading,
        ok: getAll.ok,
        error: getAll.error,
        tournaments: getAll.data,
        getAll: () => getAll.fetchData(Requests.getTournaments(getCookieToken()))
    };


    return {
        createTournament,
        editTournament,
        getTournament,
        getAllTournaments
    }

}