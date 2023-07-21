/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import useTournamentSponsor from '@/hooks/useTournamentSponsor';
import { useEffect } from 'react';


export function EditTournamentSponsorContainer() {

    const { editTournamentSponsor } = useTournamentSponsor();

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        if (!location.state?.tournamentSponsor) {
            navigate(Routes.listTournaments);
        }
    }, [location.state?.tournamentSponsor]);


    function saveDataform(data: any) {
        editTournamentSponsor.edit({
            name: data.name,
            otherInformation: data.otherInformation,
            tournamentId: location.state.tournamentSponsor.tournamentId,
        }, location.state.tournamentSponsor.tournamentId);
    }


    return (
        <>
            {editTournamentSponsor.isLoading &&
                <p>isLoading</p>
            }

            {editTournamentSponsor.ok &&
                <Navigate to={`${Routes.tournamentLessParam}/${location.state.tournamentSponsor.tournamentId}`} />
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Edite o Patrocínio</p>
                    </>
                }
                main={
                    <PostLogged.FormTournamentSponsor
                        submit={saveDataform}
                        defaultValues={location.state.tournamentSponsor}

                    />
                }
            />
        </>
    );
}