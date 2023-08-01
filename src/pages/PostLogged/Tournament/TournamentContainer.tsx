/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategoryGetResponse } from 'interfaces/ICategory';
import { Routes } from 'enums/routes.enum';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { MainContent } from './Presentation/MainContent';
import { ITournamentDataGetByIdResponse } from 'interfaces/ITournament';
import useTournament from 'hooks/useTournament';
import useCategory from 'hooks/useCategory';


export function TournamentContainer() {

    
    const { getTournament } = useTournament();
    const { getAllCategories, deleteCategory } = useCategory();

    const [listCategories, setListCategories] = useState<ICategoryGetResponse[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentDataGetByIdResponse>({} as ITournamentDataGetByIdResponse);

    const params = useParams();
    const navigate = useNavigate();

    
    useEffect(() => {
        if(params.id){
            getTournament.get(params.id);
        }
    }, [getTournament.error])

    useEffect(() => {
        if(getTournament.tournament){
            setDataTournament(getTournament.tournament);
        }
    }, [getTournament.tournament]);


    useEffect(() => {
        if (params.id) {
            getAllCategories.getAll(params.id);
        }
    }, [getAllCategories.error]);

    useEffect(() => {
        if(getAllCategories.categories){
            setListCategories(getAllCategories.categories);
        }
    }, [getAllCategories.categories]);


    useEffect(() => {
        console.log(getAllCategories.ok, getAllCategories.error, getAllCategories.isLoading, getAllCategories.categories);
    }, [getAllCategories.ok, getAllCategories.error, getAllCategories.isLoading, getAllCategories.categories])



    function removeCategory(id: string) {
        deleteCategory.delete(id);
        let arr = listCategories.filter(c => c.id !== id);
        setListCategories(arr);
    }


    return (
        <>
            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Torneio</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { tournamentId: dataTournament.id } })} />
                        }
                    </PostLogged.LayoutPage.Header>
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