/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { tournamentId } from 'constants/wordsPhrases';
import { FieldsTournament, Tournament } from 'models/Tournament';
import { Sport } from 'models/Sport';
import { City } from 'models/City';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';


export function CreateTournamentContainer() {

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
        <>
            {sports.isLoading && cities.isLoading &&
                <p>isLoading</p>
            }

            {createTournament.ok && createTournament.data &&
                <Navigate to={Routes.createCategory} state={{ [tournamentId]: createTournament.data?.id }} />
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um torneio</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormTournament
                        submit={saveDataform}
                        cities={City.toOptionCombobox(cities.data)}
                        sports={Sport.toOptionCombobox(sports.data)}
                    />
                }
            />

        </>
    );
}