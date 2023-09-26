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
    }, [])
    

    function handleClickCategories() {
        setPresentation('categories');
    }

    function handleClickInformations() {
        setPresentation('informations');
    }


    function removeCategory(id: number) {
        deleteCategory.fetch(id);
        navigate(location.pathname)
        // let arr = getCategories.listCategories.filter(c => c.id !== id);
        // setListCategories(arr);
    }

    function editCategory(id: number) {
        let category = categories.data?.find((c) => c.id === id);
        if (category) {
            navigate(Routes.editCategory, { state: { category } })
        }
    }


    return (
        <>
            <PostLogged.LayoutPage.Layout
                header={
                    <>
                        <PostLogged.LayoutPage.Header>
                            <PostLogged.ButtonBack onClick={() => navigate(Routes.listTournaments)} />
                            <p>Torneio</p>
                            {isAdmin() &&
                                <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { [tournamentId]: tournament.data.id } })} />
                            }
                        </PostLogged.LayoutPage.Header>
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
                    </>

                }
                main={
                    presentation === "categories" ?
                        <ListCategories
                            dataTournament={tournament.data}
                            listCategories={categories.data}
                            editCategory={editCategory}
                            removeCategory={removeCategory}
                        />
                        : presentation === "informations" &&
                        <Informations infoTournament={tournament.data} />
                }
            />

        </>
    );
}