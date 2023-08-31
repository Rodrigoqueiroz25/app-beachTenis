/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";

import { useEffect } from 'react';
import useFetchTournament from 'hooks/useFetchTournament';
import useGetCities from 'hooks/useGetCities';
import useGetSports from 'hooks/useGetSports';


export function EditTournamentContainer() {
    
    const { editTournament } = useFetchTournament();

    const navigate = useNavigate();
    const { state: { tournament } } = useLocation();

    const getCities = useGetCities();
    const getSports = useGetSports();

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
                        cities={getCities.cities?.map((city) => (
                            {name: city.name, value: city.id}
                        ))}
                        sports={getSports.sports?.map((sport) => (
                            {name: sport.description, value: sport.id}
                        ))}
                        defaultValues={{...tournament}}
                    />
                }
            />

        </>
    );
}