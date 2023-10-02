/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { useEffect } from 'react';
import { Tournament } from 'models/Tournament';
import { City } from 'models/City';
import { Sport } from 'models/Sport';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';



export function EditTournament() {

    const { StateFetchHandle, Body, Header, HeaderDiv, Main } = PostLogged.Layout();
    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const updateTournament = selector('tournament', 'update');
    const cities = selector('city', 'getAll');
    const sports = selector('sport', 'getAll');

    const { state: { tournament } }: { state: { tournament: Tournament } } = useLocation();

    useEffect(() => {
        cities.fetch();
        sports.fetch();
    }, []);


    function saveDataform(data: any) {
        updateTournament.fetch(Tournament.formatToSend(data), tournament.id);
    }


    return (
        <>
            {!tournament &&
                <Navigate to={Routes.listTournaments} />
            }

            <StateFetchHandle
                isLoading={cities.isLoading && sports.isLoading}
                dataGetted={cities.ok && sports.ok}
                shouldRedirect={{
                    redirect: updateTournament.ok,
                    to: `${Routes.tournamentLessParam}/${tournament.id}`
                }}
            >
                <Body>
                    <Header>
                        <HeaderDiv>
                            <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                            <p>Altere o Torneio</p>
                        </HeaderDiv>
                    </Header>
                    <Main>
                        <PostLogged.FormTournament
                            submit={saveDataform}
                            cities={City.toOptionCombobox(cities.data)}
                            sports={Sport.toOptionCombobox(sports.data)}
                            defaultValues={Tournament.toFieldsFormFormat(tournament)}
                        />
                    </Main>
                </Body>
            </StateFetchHandle>
        </>
    );
}