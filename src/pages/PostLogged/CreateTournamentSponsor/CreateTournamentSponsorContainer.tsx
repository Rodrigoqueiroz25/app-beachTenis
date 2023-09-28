/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate, useParams } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { useEffect } from 'react';
import { FieldsTournamentSponsor, TournamentSponsor } from 'models/TournamentSponsor';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function CreateTournamentSponsorContainer() {

    const { Header, Main, HeaderDiv, Body, StateFetchHandle } = PostLogged.Layout();
    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { data, fetch, isLoading, ok } = selector('tournamentSponsor', 'create');

    const { tournamentId } = useParams<{ tournamentId: string }>();

    useEffect(() => {
        if (!tournamentId) {
            navigate(Routes.listTournaments);
        }
    }, [tournamentId]);


    function saveDataform(data: FieldsTournamentSponsor) {
        fetch(TournamentSponsor.formatToSend(data, Number(tournamentId)));
    }


    return (
        <StateFetchHandle
            isLoading={isLoading}
            shouldRedirect={{
                redirect: ok,
                to: `${Routes.tournamentLessParam}/${tournamentId}`
            }}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um Patrocínio</p>
                    </HeaderDiv>
                </Header>
                <Main>
                    <PostLogged.FormTournamentSponsor
                        submit={saveDataform}
                    />
                </Main>
            </Body>
        </StateFetchHandle>
    );
}