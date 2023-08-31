/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import { tournamentId } from 'constants/wordsPhrases';
import useFetchCategory from 'hooks/useFetchCategory';


export function EditCategoryContainer() {

    const { editCategory } = useFetchCategory();
    const navigate = useNavigate();
    const { state: { category } } = useLocation();

    useEffect(() => {
        if (!category) {
            navigate(Routes.listTournaments);
        }
    }, [category]);


    function submitForm(data: any) {
        data[tournamentId] = category[tournamentId];
        editCategory.update(data, category.id);
        navigate(`${Routes.tournamentLessParam}/${category?.[tournamentId]}`);
    }


    return (
        <>
            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${category?.tournamentId}`)
                        } />
                        <p>Adicionar Categorias</p>
                    </PostLogged.LayoutPage.Header>
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
