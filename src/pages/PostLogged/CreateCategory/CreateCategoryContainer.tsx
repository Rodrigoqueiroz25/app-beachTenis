/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import useFetchCategory from 'hooks/useFetchCategory';


export function CreateCategoryContainer() {

    const { createCategory } = useFetchCategory();
    
    const { state: { tournamentId } } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tournamentId) {
            navigate(Routes.listTournaments);
        }
    }, [tournamentId]);

    
    function submitForm(dataForm: any) {
        createCategory.write({ ...dataForm, tournamentId });
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`);
    }
    

    return (
        <>
            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
                        } />
                        <p>Adicionar Categorias</p>
                    </PostLogged.LayoutPage.Header>
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
