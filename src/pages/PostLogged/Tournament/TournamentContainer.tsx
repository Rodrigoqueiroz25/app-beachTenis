/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ICategoryRegistered } from '@/interfaces/ICategory';
import useFetchData from '@/hooks/useFetchData';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';
import { MainContent } from './Presentation/MainContent';
import { ITournamentDataGettedByIdResponse } from '@/interfaces/ITournament';


export function TournamentContainer() {

    const fetchCategories = useFetchData<ICategoryRegistered[]>();
    const fetchTournament = useFetchData<ITournamentDataGettedByIdResponse>();

    const [listCategories, setListCategories] = useState<ICategoryRegistered[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentDataGettedByIdResponse>({} as ITournamentDataGettedByIdResponse);

    const params = useParams();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if(params.id){
            fetchTournament.fetchData(Requests.getTournament(params.id, getCookieToken()));
        }
    }, [fetchTournament.error])

    useEffect(() => {
        if(fetchTournament.data){
            setDataTournament(fetchTournament.data);
        }
    }, [fetchTournament.data]);


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