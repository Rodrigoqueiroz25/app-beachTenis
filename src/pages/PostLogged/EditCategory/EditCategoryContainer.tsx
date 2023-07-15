/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from "@/hooks/useCookiesSession";

import { ICategoryRegistered } from '@/interfaces/ICategory';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/PostLogged/ButtonBack/ButtonBack";
import { Requests } from '@/helper/Requests';


export function EditCategoryContainer() {

    const [category, setCategory] = useState<ICategoryRegistered>({} as ICategoryRegistered);

    const { data, error, fetchData, isLoading, ok } = useFetchData<ICategoryRegistered[]>();
    const location = useLocation();
    const navigate = useNavigate();
    const { getCookieToken } = useCookiesSession();


    useEffect(() => {
        if (location.state?.category) {
            setCategory(location.state.category);
        }
        else {
            navigate(Routes.home);
        }
    }, []);


    function submitForm(dataForm: any) {
        fetchData(Requests.updateCategory({ ...dataForm, tournamentId: category.tournamentId }, category.id, getCookieToken()));
    }


    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${category?.tournamentId}`)
                        } />
                        <p>Adicionar Categorias</p>
                    </>
                }
                main={
                    <PostLogged.FormCategory
                        submit={submitForm}
                        defaultValues={category}
                    />
                }
            />
        </>
    );
}
