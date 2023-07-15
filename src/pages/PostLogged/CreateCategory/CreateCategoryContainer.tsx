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
import { MainContent } from './Presentation/MainContent';


export function CreateCategoryContainer() {

    const [tournamentId, setTournamentId] = useState<string>("");

    const { data, error, fetchData, isLoading, ok } = useFetchData<ICategoryRegistered[]>();
    const location = useLocation();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();

    useEffect(() => {
        if (location.state?.tournamentId) {
            setTournamentId(location.state.tournamentId);
        }
        else {
            navigate(Routes.home);
        }
    });


    function submitForm(dataForm: any) {
        fetchData(Requests.createCategory({ ...dataForm, tournamentId: tournamentId }, getCookieToken()));
    }
    


    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${location.state.tournamentId}`)
                        } />
                        <p>Adicionar Categorias</p>
                    </>
                }
                main={
                    <PostLogged.FormCategory
                        submit={submitForm}
                    />
                }
            />
        </>
    );
}
