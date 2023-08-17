/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import useTournamentSponsor from 'hooks/useTournamentSponsor';
import { useEffect } from 'react';
import { tournamentId } from 'constants/wordsPhrases';


export function EditTournamentSponsorContainer() {

    const { editTournamentSponsor } = useTournamentSponsor();
    const navigate = useNavigate();
    const { state: { tournamentSponsor } } = useLocation();

    useEffect(() => {
        if (!tournamentSponsor) {
            navigate(Routes.listTournaments);
        }
    }, [tournamentSponsor]);


    function saveDataform(data: any) {
        data[tournamentId] = tournamentSponsor[tournamentId];
        editTournamentSponsor.edit(data, tournamentSponsor.tournamentId);
    }


    return (
        <>
            {editTournamentSponsor.isLoading &&
                <p>isLoading</p>
            }

            {editTournamentSponsor.ok &&
                <Navigate to={`${Routes.tournamentLessParam}/${tournamentSponsor.tournamentId}`} />
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Edite o Patrocínio</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormTournamentSponsor
                        submit={saveDataform}
                        defaultValues={tournamentSponsor}

                    />
                }
            />
        </>
    );
}