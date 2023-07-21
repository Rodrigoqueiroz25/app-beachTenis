/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { IFormTournament } from '@/interfaces/ITournament';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { Validations } from '@/helper/Validations';
import { americanDateString, brazilDateString } from '@/helper/convertData';
import useCities from '@/hooks/useCities';
import useSports from '@/hooks/useSports';
import useTournament from '@/hooks/useTournament';


export function EditTournamentContainer() {
    
    const { editTournament } = useTournament();

    const navigate = useNavigate();
    const location = useLocation();

    const getCities = useCities();
    const getSports = useSports();


    function saveDataform(data: any) {
        editTournament.edit({
            description: data.description,
            cityId: data.cityId,
            sportId: data.sportId,
            dtStartTournament: brazilDateString(data.dtStartTournament),
            dtFinalTournament: brazilDateString(data.dtFinalTournament),
            dtStartRegistration: brazilDateString(data.dtStartRegistration),
            dtFinalRegistration: brazilDateString(data.dtFinalRegistration),
            otherInformation: data.otherInformation,
            organization: data.organization
        }, location.state.tournament.id);
    }


    return (
        <>
            {editTournament.isLoading &&
                <p>isLoading</p>
            }

            {editTournament.ok &&
                <Navigate to={Routes.listTournaments}/>
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Altere o Torneio</p>
                    </>
                }
                main={
                    <PostLogged.FormTournament
                        submit={saveDataform}
                        cities={getCities.cities}
                        sports={getSports.sports}
                        schema={Validations.formEditTournament}
                        defaultValues={{
                            description: location.state.tournament.description,
                            organization: location.state.tournament.organization,
                            cityId: location.state.tournament.city.id,
                            sportId: location.state.tournament.sport.id,
                            dtStartRegistration: americanDateString(location.state.tournament.dtStartRegistration),
                            dtFinalRegistration: americanDateString(location.state.tournament.dtFinalRegistration),
                            dtStartTournament: americanDateString(location.state.tournament.dtStartTournament),
                            dtFinalTournament: americanDateString(location.state.tournament.dtFinalTournament),
                            otherInformation: location.state.tournament.otherInformation
                        } as IFormTournament}
                    />
                }
            />

        </>
    );
}