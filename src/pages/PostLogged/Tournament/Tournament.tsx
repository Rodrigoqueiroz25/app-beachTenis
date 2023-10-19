/* eslint-disable react-hooks/exhaustive-deps */


import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css'
import logo from 'assets/logoTour.jpg';
import { ListCategories } from './components/ListCategories/ListCategories';
import { Informations } from './components/Informations/Informations';
import { isAdmin } from 'functions/isAdmin';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useQueryParam } from 'hooks/useQueryParam';
import { ButtonsSelectors } from 'components/PostLogged/ButtonsSelectors/ButtonsSelectors';



export function Tournament() {

    const { StateFetchHandle, Body, Header, HeaderDiv, Main } = PostLogged.Layout();

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { selector } = useSelectorMethodFetch();
    const tournament = selector('tournament', 'get');
    const categories = selector('category', 'getAll');
    const deleteCategory = selector('category', 'remove');
    const registerPlayer = selector('category', 'registerPlayerSingle');

    const [display, setDisplay] = useQueryParam('display', 'categories');

    const isLoading = categories.isLoading || tournament.isLoading;
    const ok = categories.ok && tournament.ok;

    useEffect(() => {
        if (!params.id) {
            navigate(Routes.listTournaments)
        }
    }, [params.id])

    useEffect(() => {
        categories.fetch(Number(params.id));
        tournament.fetch(Number(params.id));
    }, [params.id])

    useEffect(() => {
        if (deleteCategory.ok) {
            categories.fetch(Number(params.id));
        }
    }, [deleteCategory.ok, params.id]);


    const removeCategory = useCallback((id: number) => {
        deleteCategory.fetch(id);
    }, [deleteCategory.fetch]);


    const editCategory = useCallback((id: number) => {
        let category = categories.data?.find((c) => c.id === id);
        if (category) {
            navigate(Routes.editCategory, { state: { category } })
        }
    }, [categories.data]);


    const registerPlayerInCategorySingle = useCallback((categoryId: number) => {
        registerPlayer.fetch(categoryId);
    }, [registerPlayer.fetch]);

    useEffect(() => {
        if (registerPlayer.ok) {
            categories.fetch(Number(params.id));
        }
    }, [registerPlayer.ok, params.id]);


    return (
        <StateFetchHandle
            isLoading={isLoading}
            dataGetted={ok}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Torneio</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { tournamentId: tournament.data.id } })} />
                        }
                    </HeaderDiv>
                    <div className={styles.header}>
                        <div className={styles.tournament}>
                            <img src={logo} alt="" />
                            <p>{tournament.data.description}</p>
                        </div>
                        <ButtonsSelectors
                            onClick={setDisplay}
                            btnSel={display}
                            buttons={[
                                { name: 'Categorias', value: 'categories' },
                                { name: 'Informações', value: 'informations' }
                            ]}
                        />
                    </div>
                </Header>
                <Main>
                    {display === "categories"
                        ?
                        <ListCategories
                            dataTournament={tournament.data}
                            listCategories={categories.data}
                            editCategory={editCategory}
                            removeCategory={removeCategory}
                            registration={registerPlayerInCategorySingle}
                        />
                        : display === "informations" &&
                        < Informations infoTournament={tournament.data} />
                    }
                </Main>
            </Body>
        </StateFetchHandle>
    );
}