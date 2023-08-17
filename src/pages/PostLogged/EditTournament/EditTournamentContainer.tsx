/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import useCities from 'hooks/useCities';
import useSports from 'hooks/useSports';
import useTournament from 'hooks/useTournament';
import { useEffect } from 'react';


export function EditTournamentContainer() {
    
    const { editTournament } = useTournament();

    const navigate = useNavigate();
    const { state: { tournament } } = useLocation();

    const getCities = useCities();
    const getSports = useSports();

    useEffect(() => {
        if (!tournament) {
            navigate(Routes.listTournaments);
        }
    }, [tournament]);


    function saveDataform(data: any) {
        editTournament.edit(data, tournament.id);
    }


    return (
        <>
            {editTournament.isLoading &&
                <p>isLoading</p>
            }

            {editTournament.ok &&
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
                        cities={getCities.cities}
                        sports={getSports.sports}
                        defaultValues={{...tournament}}
                    />
                }
            />

        </>
    );
}