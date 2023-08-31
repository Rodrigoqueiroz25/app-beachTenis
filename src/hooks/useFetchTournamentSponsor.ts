
import useFetchData from "./useFetchData"
import { Requests } from "helper/Requests"
import useCookiesSession from "./useCookiesSession";
import { ITournamentSponsor, ITournamentSponsorResponse } from "interfaces/ITournamentSponsor";


export default function useFetchTournamentSponsor() {

    const { getCookieToken } = useCookiesSession();

    const fetch = useFetchData();
    

    const createTournamentSponsor = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        sponsorCreated: fetch.data as ITournamentSponsorResponse,
        create: (data: ITournamentSponsor) => fetch.fetchData(Requests.createTournamentSponsor(data, getCookieToken()))
    };

    const editTournamentSponsor = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        sponsorEdited: fetch.data as ITournamentSponsorResponse,
        edit: (data: ITournamentSponsor, id: string) => fetch.fetchData(Requests.editTournamentSponsor(data, id, getCookieToken()))
    };


    const getAllTournamentSponsor = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        sponsors: fetch.data as ITournamentSponsorResponse[],
        getAll: (tournamentId: string) => fetch.fetchData(Requests.getTournamentSponsors(tournamentId, getCookieToken()))
    };


    const deleteTournamentSponsor = {
        isLoading: fetch.isLoading,
        ok: fetch.ok,
        error: fetch.error,
        getAll: (sponsorId: string) => fetch.fetchData(Requests.deleteTournamentSponsor(sponsorId, getCookieToken()))
    };


    return {
        createTournamentSponsor,
        editTournamentSponsor,
        getAllTournamentSponsor,
        deleteTournamentSponsor
    }

}