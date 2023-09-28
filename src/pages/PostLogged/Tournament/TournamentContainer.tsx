/* eslint-disable react-hooks/exhaustive-deps */


import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css'
import logo from 'assets/logoTour.jpg';
import { ListCategories } from './Presentation/ListCategories';
import { Informations } from './Presentation/Informations/Informations';
import { tournamentId } from 'constants/wordsPhrases';
import { isAdmin } from 'functions/isAdmin';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function TournamentContainer() {

    const { StateFetchHandle, Body, Header, HeaderDiv, Main } = PostLogged.Layout();
    const [presentation, setPresentation] = useState('categories');

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { selector } = useSelectorMethodFetch();
    const tournament = selector('tournament', 'get');
    const categories = selector('category', 'getAll');
    const deleteCategory = selector('category', 'remove');

    useEffect(() => {
        if (!params.id) {
            navigate(Routes.listTournaments)
        }
    }, [])

    useEffect(() => {
        categories.fetch(Number(params.id));
        tournament.fetch(Number(params.id));
    }, [params.id])

    useEffect(() => {
        if (deleteCategory.ok) {
            navigate(location.pathname)
        }
    }, [deleteCategory.ok]);

    function removeCategory(id: number) {
        deleteCategory.fetch(id);
    }

    function editCategory(id: number) {
        let category = categories.data?.find((c) => c.id === id);
        if (category) {
            navigate(Routes.editCategory, { state: { category } })
        }
    }

    function handleClickCategories() {
        setPresentation('categories');
    }

    function handleClickInformations() {
        setPresentation('informations');
    }



    return (
        <StateFetchHandle
            isLoading={tournament.isLoading && categories.isLoading}
            dataGetted={tournament.ok && categories.ok}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                        <p>Torneio</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { [tournamentId]: tournament.data.id } })} />
                        }
                    </HeaderDiv>
                    <div className={styles.header}>
                        <div className={styles.tournament}>
                            <img src={logo} alt="" />
                            <p>{tournament.data.description}</p>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                value={'categories'}
                                onClick={handleClickCategories}
                                className={presentation === 'categories' ? `${styles.focus}` : ""}
                            >Categorias</button>

                            <button
                                value={'informations'}
                                onClick={handleClickInformations}
                                className={presentation === 'informations' ? `${styles.focus}` : ""}
                            >Informações</button>
                        </div>
                    </div>
                </Header>
                <Main>
                    {presentation === "categories"
                        ?
                        <ListCategories
                            dataTournament={tournament.data}
                            listCategories={categories.data}
                            editCategory={editCategory}
                            removeCategory={removeCategory}
                        />
                        : presentation === "informations" &&
                        <Informations infoTournament={tournament.data} />
                    }
                </Main>
            </Body>
        </StateFetchHandle>
    );
}