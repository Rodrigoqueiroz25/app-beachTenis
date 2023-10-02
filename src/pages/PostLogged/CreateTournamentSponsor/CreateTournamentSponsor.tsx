/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { FieldsTournamentSponsor, TournamentSponsor } from 'models/TournamentSponsor';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function CreateTournamentSponsor() {

    const { Header, Main, HeaderDiv, Body, StateFetchHandle } = PostLogged.Layout();
    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, isLoading, ok } = selector('tournamentSponsor', 'create');

    const { tournamentId } = useParams<{ tournamentId: string }>();


    function saveDataform(data: FieldsTournamentSponsor) {
        fetch(TournamentSponsor.formatToSend(data, Number(tournamentId)));
    }


    return (
        <>
            {!tournamentId &&
                <Navigate to={Routes.listTournaments} />
            }

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
        </>
    );
}