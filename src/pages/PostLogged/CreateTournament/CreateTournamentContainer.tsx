/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import useCities from 'hooks/useGetCities';
import useSports from 'hooks/useGetSports';
import { tournamentId } from 'constants/wordsPhrases';
import useFetchTournament from 'hooks/useFetchTournament';


export function CreateTournamentContainer() {

    const { createTournament } = useFetchTournament();
    
    const navigate = useNavigate();

    const getCities = useCities();
    const getSports = useSports();


    function saveDataform(data: any) {
        // console.log(data);
        createTournament.create(data);
    }


    return (
        <>
            {createTournament.isLoading &&
                <p>isLoading</p>
            }

            {createTournament.ok &&
                <Navigate to={Routes.createCategory} state={{ [tournamentId]: createTournament.tournamentCreated?.id }} />
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
                        cities={getCities.cities?.map((city) => (
                            {name: city.name, value: city.id}
                        ))}
                        sports={getSports.sports?.map((sport) => (
                            {name: sport.description, value: sport.id}
                        ))}
                    />
                }
            />

        </>
    );
}