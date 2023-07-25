/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import useCategory from 'hooks/useCategory';
import { ICategoryDataWriteResponse } from 'interfaces/ICategory';


export function EditCategoryContainer() {

    const [category, setCategory] = useState<ICategoryDataWriteResponse>({} as ICategoryDataWriteResponse);

    const { editCategory } = useCategory();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.state?.category) {
            setCategory(location.state.category);
        }
        else {
            navigate(Routes.listTournaments);
        }
    }, []);


    function submitForm(dataForm: any) {
        editCategory.update({ ...dataForm, tournamentId: category.tournamentId}, category.id);
        navigate(`${Routes.tournamentLessParam}/${category?.tournamentId}`);
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
