/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { List } from './Presentation/List';
import useTournament from 'hooks/useTournament';
import styles from './styles.module.css'


export function ListTournamentsContainer() {

    const [inProgress, setInProgress] = useState(true);

    const { getAllTournamentsFilteredByDate } = useTournament();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTournamentsFilteredByDate.getAllFilteredByDate();
    }, [getAllTournamentsFilteredByDate.error]);

    function handleClickInProgress() {
        setInProgress(true);
    }

    function handleClickFinished() {
        setInProgress(false);
    }



    return (

        <PostLogged.LayoutPage.Layout
            header={
                <>
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                        <p>Torneios</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createTournament)} />
                        }

                    </PostLogged.LayoutPage.Header>
                    <div className={styles.buttons}>
                        <button
                            value="andamento"
                            onClick={handleClickInProgress}
                            className={inProgress ? `${styles.focus}` : ""}
                        >Em andamento</button>

                        <button
                            value="finalizado"
                            onClick={handleClickFinished}
                            className={!inProgress ? `${styles.focus}` : ""}
                        >Finalizado</button>
                    </div>
                </>
            }
            main={
                <List listTournaments={inProgress ? getAllTournamentsFilteredByDate.tournaments?.opened : getAllTournamentsFilteredByDate.tournaments?.finished} />
            }
        />
    );
}