/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { ButtonBack } from "@/components/PostLogged/ButtonBack/ButtonBack";
import useCategory from '@/hooks/useCategory';


export function CreateCategoryContainer() {

    const [tournamentId, setTournamentId] = useState<string>("");

    const { createCategory } = useCategory();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.tournamentId) {
            setTournamentId(location.state.tournamentId);
        }
        else {
            navigate(Routes.listTournaments);
        }
    }, []);

    
    function submitForm(dataForm: any) {
        createCategory.write({ ...dataForm, tournamentId: tournamentId });
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`);
    }
    

    return (
        <>
            <PostLogged.Layout
                header={
                    <>
                        <ButtonBack onClick={() =>
                            navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
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
