/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import { Category, FieldsCategory } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';



export function CreateCategoryContainer() {

    const { Header, Main, HeaderDiv, Body, StateFetchHandle } = PostLogged.Layout();
    const { selector } = useSelectorMethodFetch();
    const { fetch, isLoading, ok } = selector('category', 'create');

    const { state: { tournamentId } }: { state: { tournamentId: number } } = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!tournamentId) {
    //         navigate(Routes.listTournaments);
    //     }
    // }, [tournamentId]);


    function submitForm(data: FieldsCategory) {
        fetch(Category.formatToSend(data, tournamentId));
        // navigate(`${Routes.tournamentLessParam}/${tournamentId}`);
    }


    return (
        <>
            {!tournamentId &&
                <Navigate to={Routes.listTournaments} />
            }

            <StateFetchHandle
                isLoading={isLoading}
                shouldRedirect={{
                    redirect: ok,
                    to: `${Routes.tournamentLessParam}/${tournamentId}`,
                }}
            >
                <Body>
                    <Header>
                        <HeaderDiv>
                            <ButtonBack onClick={() =>
                                navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
                            } />
                            <p>Adicionar Categorias</p>
                        </HeaderDiv>
                    </Header>
                    <Main>
                        <PostLogged.FormCategory
                            submit={submitForm}
                        />
                    </Main>
                </Body>
            </StateFetchHandle>
        </>
    );
}
