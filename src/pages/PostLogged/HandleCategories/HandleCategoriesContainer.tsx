/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from "@/hooks/useCookiesSession";

import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Routes } from "@/enums/routes.enum";
import { Requests } from "@/helper/Requests";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/PostLogged/ButtonBack/ButtonBack";
import { ITournamentRegistered } from "@/interfaces/ITournament";
import { MainContent } from './Presentation/MainContent';


export function HandleCategoriesContainer() {

    const [listCategories, setListCategories] = useState<ICategoryRegistered[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentRegistered>({} as ITournamentRegistered);

    const { data, error, fetchData, isLoading, ok } = useFetchData<ICategoryRegistered[]>();
    const location = useLocation();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();



    useEffect(() => {
        if (location?.state?.tournament) {
            fetchData(Requests.getCategories(location.state.tournament.id, getCookieToken()));
            setDataTournament(location.state.tournament);
        }
        else {
            navigate(Routes.home);
        }
    }, []);

    useEffect(() => {
        setTimeout(async () => {
            if (ok && data) {
                if (listCategories.length === 0) {
                    setListCategories([...listCategories].concat(data));
                }
                else {
                    addCategoriesState((data as unknown) as ICategoryRegistered);
                }
            }
        }, 100);
    }, [data]);



    function submit(isEdit: boolean, id?: string) {
        if (isEdit) {
            return function (dataForm: any) {
                fetchData(Requests.updateCategory({ ...dataForm, tournamentId: dataTournament.id }, id as string, getCookieToken()));
            }
        }

        else {
            return function (dataForm: any) {
                fetchData(Requests.createCategory({ ...dataForm, tournamentId: dataTournament.id }, getCookieToken()));
            }
        }
    }
    
  
    function addCategoriesState(category: ICategoryRegistered) {
        let arr = listCategories.filter(c => c.id !== category.id);
        arr.push(category);
        setListCategories(arr);
    }

    function removeCategory(id: string) {
        fetchData(Requests.deleteCategory(parseInt(id), getCookieToken()));
        let arr = listCategories.filter(c => c.id !== id);
        setListCategories(arr);
    }



    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${location.state.tournament.id}`, { state: { tournament: location.state.tournament } })
                        } />
                        <p>Adicionar Categorias</p>
                    </>
                }
                main={
                    <MainContent
                        listCategories={listCategories}
                        removeCategory={removeCategory}
                        submitForm={submit}
                    />
                }
            />
        </>
    );
}
