/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css'
import { useEffect, useState } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { ItemListTournament } from './Presentation/ItemListTournament';
import { ButtonsSelectors } from './Presentation/ButtonsSelectors';
import { Tournament } from 'models/Tournament';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { isAdmin } from 'functions/isAdmin';



export function ListTournamentsContainer() {

    const [inProgress, setInProgress] = useState(true);

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, data, isLoading, ok } = selector('tournament', 'getAll');

    useEffect(() => {
        fetch();
    }, []);


    function access(tournamentId: number): void {
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
    }

    function configure(tournament: Tournament): void {
        navigate(Routes.editTournament, { state: { tournament } });
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
                    <ButtonsSelectors onClick={(v) => setInProgress(v)} />
                </>
            }
            main={
                <div className={styles.list}>
                    {(inProgress ? data.opened : data.finished)
                        ?.map((tournament: Tournament, key: number) => (
                            <ItemListTournament
                                tournament={tournament}
                                funcBtnAccess={access}
                                funcBtnConfigure={configure}
                                key={key}
                            />
                        ))}
                </div>
            }
        />
    );
}