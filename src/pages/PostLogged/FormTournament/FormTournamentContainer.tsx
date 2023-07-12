/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { convertData } from '@/helper/convertData';
import useFetchData from '@/hooks/useFetchData';
import request from '@/helper/request';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { MainContent } from './Presentation/MainContent';


export function FormTournamentContainer() {

    const { fetchData, data, isLoading, ok, error } = useFetchData<ITournamentRegistered>();

    const [sports, setSports] = useState<ISport[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);

    const { getCookieToken } = useCookiesSession();

    const navigate = useNavigate();


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
        fetchData(Requests.createTournament({
            description: data.description,
            cityId: data.cityId,
            sportId: data.sportId,
            dtStartTournament: convertData(data.dtStartTournament),
            dtFinalTournament: convertData(data.dtFinalTournament),
            dtStartRegistration: convertData(data.dtStartRegistration),
            dtFinalRegistration: convertData(data.dtFinalRegistration),
            otherInformation: data.otherInformation,
            organization: data.organization
        }, getCookieToken()));
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {ok &&
                <Navigate to={Routes.addCategories} state={{ tournament: data }} />
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Adicione um torneio</p>
                    </>
                }
                main={
                    <MainContent
                        submit={saveDataform}
                        cities={cities}
                        sports={sports}
                    />
                }
            />

        </>
    );
}