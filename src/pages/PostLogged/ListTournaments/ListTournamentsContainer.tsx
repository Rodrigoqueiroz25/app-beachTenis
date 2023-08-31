/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import styles from './styles.module.css'
import { ITournamentDataGetResponse } from 'interfaces/ITournament';
import { ItemListTournament } from './Presentation/ItemListTournament';
import { ButtonsSelectors } from './Presentation/ButtonsSelectors';
import useFetchTournament from 'hooks/useFetchTournament';


export function ListTournamentsContainer() {

    const [inProgress, setInProgress] = useState(true);

    const { getAllTournaments } = useFetchTournament();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTournaments.getAll();
    }, [getAllTournaments.error]);

  
    function access(tournamentId: number): void {
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
    }

    function configure(tournament: ITournamentDataGetResponse): void {
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
                    <ButtonsSelectors onClick={(v) => setInProgress(v)}/>
                </>
            }
            main={
                <div className={styles.list}>
                    {(inProgress ? getAllTournaments.tournaments?.opened : getAllTournaments.tournaments?.finished)
                        ?.map((tournament: ITournamentDataGetResponse, key: number) => (
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