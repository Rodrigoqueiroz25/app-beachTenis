/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import { Category, FieldsCategory } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function EditCategoryContainer() {

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { data, fetch, isLoading, ok } = selector('category', 'update');
    
    const { state: { category } }: { state: { category: Category } } = useLocation();

    useEffect(() => {
        if (!category) {
            navigate(Routes.listTournaments);
        }
    }, [category]);


    function submitForm(data: FieldsCategory) {
        fetch(Category.formatToSend(data, category.linkedToTournament), category.id);
        navigate(`${Routes.tournamentLessParam}/${category.linkedToTournament}`);
    }


    return (
        <>
            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${category.linkedToTournament}`)
                        } />
                        <p>Adicionar Categorias</p>
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <PostLogged.FormCategory
                        submit={submitForm}
                        defaultValues={Category.toFieldsFormFormat(category)}
                    />
                }
            />
        </>
    );
}
