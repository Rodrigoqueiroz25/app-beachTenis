/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


import { ICategoryRegistered } from '@/interfaces/ICategory';

import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';

import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';

import { MainContent } from './Presentation/MainContent';


export function TournamentContainer() {

    const fetchCategories = useFetchData<ICategoryRegistered[]>();

    const [listCategories, setListCategories] = useState<ICategoryRegistered[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentRegistered>({} as ITournamentRegistered);

    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if (!location.state?.tournament) {
            navigate(Routes.listTournaments);
        }
        else {
            setDataTournament(location.state.tournament);
        }
    }, [location.state.tournament, navigate]);


    useEffect(() => {
        if (params.id) {
            fetchCategories.fetchData(Requests.getCategories(parseInt(params.id), getCookieToken()));
        }
    }, [fetchCategories.error]);

    useEffect(() => {
        if(fetchCategories.data){
            setListCategories(fetchCategories.data);
        }
    }, [fetchCategories.data]);

    function removeCategory(id: string) {
        fetchCategories.fetchData(Requests.deleteCategory(parseInt(id), getCookieToken()));
        let arr = listCategories.filter(c => c.id !== id);
        setListCategories(arr);
    }

    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Torneio</p>
                        {isAdmin() &&
                            //<PostLogged.ButtonPlus onClick={() => navigate(Routes.addCategories, { state: { tournament: dataTournament } })} />
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { tournamentId: dataTournament.id } })} />
                        }
                    </>
                }
                main={
                    <MainContent
                        dataTournament={dataTournament}
                        listCategories={listCategories}
                        removeCategory={removeCategory}
                    />
                }
            />

        </>
    );
}