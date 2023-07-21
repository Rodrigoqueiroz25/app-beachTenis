/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useNavigate } from 'react-router-dom';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { Validations } from '@/helper/Validations';
import { brazilDateString } from '@/helper/convertData';
import useCities from '@/hooks/useCities';
import useSports from '@/hooks/useSports';
import useTournament from '@/hooks/useTournament';


export function CreateTournamentContainer() {


    const { createTournament } = useTournament();
    
    const navigate = useNavigate();

    const getCities = useCities();
    const getSports = useSports();


    function saveDataform(data: any) {
        console.log(data);
        createTournament.create({
            description: data.description,
            cityId: data.cityId,
            sportId: data.sportId,
            dtStartTournament: brazilDateString(data.dtStartTournament),
            dtFinalTournament: brazilDateString(data.dtFinalTournament),
            dtStartRegistration: brazilDateString(data.dtStartRegistration),
            dtFinalRegistration: brazilDateString(data.dtFinalRegistration),
            otherInformation: data.otherInformation,
            organization: data.organization
        });

    }


    return (
        <>
            {createTournament.isLoading &&
                <p>isLoading</p>
            }

            {createTournament.ok &&
                <Navigate to={Routes.createCategory} state={{ tournamentId: createTournament.tournamentCreated?.id }} />
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um torneio</p>
                    </>
                }
                main={
                    <PostLogged.FormTournament
                        submit={saveDataform}
                        cities={getCities.cities}
                        sports={getSports.sports}
                        schema={Validations.formCreateTournament}
                    />
                }
            />

        </>
    );
}