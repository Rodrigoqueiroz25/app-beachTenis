/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import useTournamentSponsor from 'hooks/useTournamentSponsor';
import { useEffect } from 'react';


export function CreateTournamentSponsorContainer() {

    const { createTournamentSponsor } = useTournamentSponsor();

    const navigate = useNavigate();
    const params = useParams();
    

    useEffect(() => {
        if (!params.tournamentId) {
            navigate(Routes.listTournaments);
        }
    }, []);

    function saveDataform(data: any) {
        createTournamentSponsor.create({
            name: data.name,
            otherInformation: data.otherInformation,
            tournamentId: params.tournamentId as string,
        });
    }


    return (
        <>
            {createTournamentSponsor.isLoading &&
                <p>isLoading</p>
            }

            {createTournamentSponsor.ok &&
                <Navigate to={`${Routes.tournamentLessParam}/${params.tournamentId}`}/>
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