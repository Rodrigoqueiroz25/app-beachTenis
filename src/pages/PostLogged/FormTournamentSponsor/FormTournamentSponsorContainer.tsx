/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate, useParams } from 'react-router-dom';
import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from '@/hooks/useCookiesSession';

import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { ITournamentSponsorRegistered } from "@/interfaces/ITournamentSponsor";
import { MainContent } from './Presentation/MainContent';


export function FormTournamentSponsorContainer() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentSponsorRegistered>();

    const { getCookieToken } = useCookiesSession();

    const navigate = useNavigate();
    const params = useParams();

    function saveDataform(data: any) {
        fetchData(Requests.createTournamentSponsor({
            name: data.name,
            otherInformation: data.otherInformation,
            tournamentId: params.tournamentId as string,
        }, getCookieToken()));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {/* {ok &&
                <Navigate to={Routes.} state={} />
            } */}

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um Patrocínio</p>
                    </>
                }
                main={
                    <MainContent submit={saveDataform}/>
                }
            />
        </>
    );
}