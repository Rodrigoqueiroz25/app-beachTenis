/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ICategoryGetResponse } from 'interfaces/ICategory';
import { Routes } from 'enums/routes.enum';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import useTournament from 'hooks/useTournament';
import useCategory from 'hooks/useCategory';
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import styles from './styles.module.css'
import logo from 'assets/logoTour.jpg';
import { categories, informations } from 'constants/constants';
import { List } from './Presentation/List';
import { Informations } from './Presentation/Informations/Informations';


export function TournamentContainer() {


    const { getTournament } = useTournament();
    const { getAllCategories, deleteCategory } = useCategory();

    const [listCategories, setListCategories] = useState<ICategoryGetResponse[]>([]);
    const [dataTournament, setDataTournament] = useState<ITournamentDataGetResponse>({} as ITournamentDataGetResponse);

    const [presentation, setPresentation] = useState(categories);

    const params = useParams();
    const navigate = useNavigate();

    function handleClickCategories() {
        setPresentation(categories);
    }

    function handleClickInformations() {
        setPresentation(informations);
    }



    useEffect(() => {
        if (params.id) {
            getTournament.get(params.id);
        }
    }, [getTournament.error])

    useEffect(() => {
        if (getTournament.tournament) {
            setDataTournament(getTournament.tournament);
        }
    }, [getTournament.tournament]);


    useEffect(() => {
        if (params.id) {
            getAllCategories.getAll(params.id);
        }
    }, [getAllCategories.error]);

    useEffect(() => {
        if (getAllCategories.categories) {
            setListCategories(getAllCategories.categories);
        }
    }, [getAllCategories.categories]);


    function removeCategory(id: string) {
        deleteCategory.delete(id);
        let arr = listCategories.filter(c => c.id !== id);
        setListCategories(arr);
    }

    function editCategory(id: string){
        let category = listCategories?.find((c) => c.id === id);
        if(category){
            navigate(Routes.editCategory, { state: { category: category }})
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
                                <PostLogged.ButtonPlus onClick={() => navigate(Routes.createCategory, { state: { tournamentId: dataTournament.id } })} />
                            }
                        </PostLogged.LayoutPage.Header>
                        <div className={styles.header}>
                            <div className={styles.tournament}>
                                <img src={logo} alt="" />
                                <p>{dataTournament.description}</p>
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    value={categories}
                                    onClick={handleClickCategories}
                                    className={presentation === categories ? `${styles.focus}` : ""}
                                >Categorias</button>

                                <button
                                    value={informations}
                                    onClick={handleClickInformations}
                                    className={presentation === informations ? `${styles.focus}` : ""}
                                >Informações</button>
                            </div>
                        </div>
                    </>

                }
                main={
                    presentation === "Categorias" ? 
                    <List
                        dataTournament={dataTournament}
                        listCategories={listCategories}
                        editCategory={editCategory}
                        removeCategory={removeCategory}
                    />
                    : presentation === "Informações" &&
                    <Informations infoTournament={dataTournament} />
                }
            />

        </>
    );
}