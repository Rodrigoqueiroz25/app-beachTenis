/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { useEffect } from 'react';
import { FieldsTournamentSponsor, TournamentSponsor } from 'models/TournamentSponsor';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function CreateTournamentSponsorContainer() {

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { data, fetch, isLoading, ok } = selector('tournamentSponsor', 'create');

    const { tournamentId } = useParams<{tournamentId: string}>();

    useEffect(() => {
        if (!tournamentId) {
            navigate(Routes.listTournaments);
        }
    }, [tournamentId]);


    function saveDataform(data: FieldsTournamentSponsor) {
        fetch(TournamentSponsor.formatToSend(data, Number(tournamentId)));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {ok && data &&
                <Navigate to={`${Routes.tournamentLessParam}/${tournamentId}`}/>
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um Patrocínio</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormTournamentSponsor
                        submit={saveDataform}
                    />
                }
            />
        </>
    );
}