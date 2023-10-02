/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { FieldsTournament, Tournament } from 'models/Tournament';
import { Sport } from 'models/Sport';
import { City } from 'models/City';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';


export function CreateTournament() {

    const { StateFetchHandle, Body, Header, Main, HeaderDiv } = PostLogged.Layout();

    const navigate = useNavigate();

    const { selector } = useSelectorMethodFetch();
    const createTournament = selector('tournament', 'create');
    const cities = selector('city', 'getAll');
    const sports = selector('sport', 'getAll');

    useEffect(() => {
        cities.fetch();
        sports.fetch();
    }, []);

    function saveDataform(data: FieldsTournament) {
        createTournament.fetch(Tournament.formatToSend(data));
    }


    return (
        <StateFetchHandle
            isLoading={sports.isLoading && cities.isLoading}
            dataGetted={sports.ok && cities.ok}
            shouldRedirect={{
                redirect: createTournament.ok,
                to: Routes.listTournaments
            }}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um torneio</p>
                    </HeaderDiv>
                </Header>
                <Main>
                    <PostLogged.FormTournament
                        submit={saveDataform}
                        cities={City.toOptionCombobox(cities.data)}
                        sports={Sport.toOptionCombobox(sports.data)}
                    />
                </Main>
            </Body>
        </StateFetchHandle>
    );
}