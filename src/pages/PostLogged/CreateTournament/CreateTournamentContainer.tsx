/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import useCities from 'hooks/useCities';
import useSports from 'hooks/useSports';
import useTournament from 'hooks/useTournament';
import { tournamentId } from 'constants/wordsPhrases';


export function CreateTournamentContainer() {

    const { createTournament } = useTournament();
    
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
                        cities={getCities.cities}
                        sports={getSports.sports}
                    />
                }
            />

        </>
    );
}