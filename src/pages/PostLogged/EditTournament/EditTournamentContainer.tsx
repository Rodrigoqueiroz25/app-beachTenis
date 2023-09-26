/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { useEffect } from 'react';
import { Tournament } from 'models/Tournament';
import { City } from 'models/City';
import { Sport } from 'models/Sport';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';



export function EditTournamentContainer() {

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const updateTournament = selector('tournament', 'update');
    const cities = selector('city', 'getAll');
    const sports = selector('sport', 'getAll');

    const { state: { tournament } }: {state: {tournament: Tournament}} = useLocation();

    useEffect(() => {
        cities.fetch();
        sports.fetch();
    }, []);
    
    useEffect(() => {
        if (!tournament) {
            navigate(Routes.listTournaments);
        }
    }, [tournament]);


    function saveDataform(data: any) {
        updateTournament.fetch(Tournament.formatToSend(data), tournament.id);
    }


    return (
        <>
            {cities.isLoading && sports.isLoading &&
                <p>isLoading</p>
            }

            {updateTournament.ok && updateTournament.data &&
                <Navigate to={Routes.listTournaments}/>
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Altere o Torneio</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormTournament
                        submit={saveDataform}
                        cities={City.toOptionCombobox(cities.data)}
                        sports={Sport.toOptionCombobox(sports.data)}
                        defaultValues={Tournament.toFieldsFormFormat(tournament)}
                    />
                }
            />

        </>
    );
}