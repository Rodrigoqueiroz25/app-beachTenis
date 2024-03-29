
/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { ButtonBack } from "components/PostLogged/ButtonBack/ButtonBack";
import { Category, FieldsCategory } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function EditCategory() {

    const { Header, Main, HeaderDiv, Body, StateFetchHandle } = PostLogged.Layout();
    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, isLoading, ok } = selector('category', 'update');

    const { state: { category } }: { state: { category: Category } } = useLocation();


    function submitForm(data: FieldsCategory) {
        fetch(Category.formatToSend(data, category.linkedToTournament), category.id);
    }


    return (
        <>
            {!category &&
                <Navigate to={Routes.listTournaments} />
            }

            <StateFetchHandle
                isLoading={isLoading}
                shouldRedirect={{
                    redirect: ok,
                    to: `${Routes.tournamentLessParam}/${category.linkedToTournament}`,
                }}
            >
                <Body>
                    <Header>
                        <HeaderDiv>
                            <ButtonBack onClick={() =>
                                navigate(`${Routes.tournamentLessParam}/${category.linkedToTournament}`)
                            } />
                            <p>Adicionar Categorias</p>
                        </HeaderDiv>
                    </Header>
                    <Main>
                        <PostLogged.FormCategory
                            submit={submitForm}
                            defaultValues={Category.toFieldsFormFormat(category)}
                        />
                    </Main>
                </Body>
            </StateFetchHandle>
        </>
    );
}
