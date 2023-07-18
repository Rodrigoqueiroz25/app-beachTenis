/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import useFetchData from '@/hooks/useFetchData';
import request from '@/helper/request';
import useCookiesSession from '@/hooks/useCookiesSession';
import { IFormTournament, ITournamentDataWriteResponse } from '@/interfaces/ITournament';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { Validations } from '@/helper/Validations';
import { americanDateString, brazilDateString } from '@/helper/convertData';


export function EditTournamentContainer() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentDataWriteResponse>();

    const [sports, setSports] = useState<ISport[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    const { getCookieToken } = useCookiesSession();

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        setTimeout(async () => {
            let sports = await request<ISport[]>(Requests.getSports(getCookieToken()));
            if (sports.ok) {
                setSports(sports.data as ISport[]);
            }
            let cities = await request<ICity[]>(Requests.getCities(getCookieToken()));
            if (cities.ok) {
                setCities(cities.data as ICity[]);
            }
        }, 200);
    }, []);



    function saveDataform(data: any) {
        fetchData(Requests.editTournament({
            description: data.description,
            cityId: data.cityId,
            sportId: data.sportId,
            dtStartTournament: brazilDateString(data.dtStartTournament),
            dtFinalTournament: brazilDateString(data.dtFinalTournament),
            dtStartRegistration: brazilDateString(data.dtStartRegistration),
            dtFinalRegistration: brazilDateString(data.dtFinalRegistration),
            otherInformation: data.otherInformation,
            organization: data.organization
        }, location.state.tournament.id, getCookieToken()));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {ok &&
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
                        cities={cities}
                        sports={sports}
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