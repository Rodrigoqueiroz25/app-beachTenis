/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import { Category, FieldsCategory } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';



export function CreateCategoryContainer() {

    // const { data, fetch, isLoading, ok } = useCreateCategory();
    const { selector } = useSelectorMethodFetch();
    const { data, fetch, isLoading, ok } = selector('category', 'create');

    const { state: { tournamentId } }: { state: { tournamentId: number } } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!tournamentId) {
            navigate(Routes.listTournaments);
        }
    }, [tournamentId]);

    
    function submitForm(data: FieldsCategory) {
        fetch(Category.formatToSend(data, tournamentId));
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
