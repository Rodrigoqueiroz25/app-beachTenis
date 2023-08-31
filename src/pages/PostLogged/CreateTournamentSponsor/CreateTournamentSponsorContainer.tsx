/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { useEffect } from 'react';
import { tournamentId } from 'constants/wordsPhrases';
import useFetchTournamentSponsor from 'hooks/useFetchTournamentSponsor';


export function CreateTournamentSponsorContainer() {

    const { createTournamentSponsor } = useFetchTournamentSponsor();

    const navigate = useNavigate();
    const params = useParams();
    
    useEffect(() => {
        if (!params[tournamentId]) {
            navigate(Routes.listTournaments);
        }
    }, [params[tournamentId]]);


    function saveDataform(data: any) {
        data[tournamentId] = params[tournamentId];
        createTournamentSponsor.create(data);
    }


    return (
        <>
            {createTournamentSponsor.isLoading &&
                <p>isLoading</p>
            }

            {createTournamentSponsor.ok &&
                <Navigate to={`${Routes.tournamentLessParam}/${params[tournamentId]}`}/>
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um Patrocínio</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormTournamentSponsor
                        submit={saveDataform}
                    />
                }
            />
        </>
    );
}