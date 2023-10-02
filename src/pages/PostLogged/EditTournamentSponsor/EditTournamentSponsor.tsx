/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { FieldsTournamentSponsor, TournamentSponsor } from 'models/TournamentSponsor';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function EditTournamentSponsor() {

    const { Header, HeaderDiv, Main, Body, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, isLoading, ok } = selector('tournamentSponsor', 'update');

    const { state: { tournamentSponsor } }: { state: { tournamentSponsor: TournamentSponsor } } = useLocation();


    function saveDataform(data: FieldsTournamentSponsor) {
        fetch(TournamentSponsor.formatToSend(data, tournamentSponsor.linkedToTournament), tournamentSponsor.id);
    }


    return (
        <>
            {!tournamentSponsor &&
                <Navigate to={Routes.listTournaments} />
            }

            <StateFetchHandle
                isLoading={isLoading}
                shouldRedirect={{
                    redirect: ok,
                    to: `${Routes.tournamentLessParam}/${tournamentSponsor.linkedToTournament}`
                }}
            >
                <Body>
                    <Header>
                        <HeaderDiv>
                            <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                            <p>Edite o Patrocínio</p>
                        </HeaderDiv>
                    </Header>
                    <Main>
                        <PostLogged.FormTournamentSponsor
                            submit={saveDataform}
                            defaultValues={tournamentSponsor}

                        />
                    </Main>
                </Body>
            </StateFetchHandle>
        </>
    );
}