/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css'
import { useCallback, useEffect } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { ItemListTournament } from './components/ItemListTournament/ItemListTournament';
import { ButtonsSelectors } from '../../../components/PostLogged/ButtonsSelectors/ButtonsSelectors';
import { Tournament } from 'models/Tournament';
import { isAdmin } from 'functions/isAdmin';
import { useQueryParam } from 'hooks/useQueryParam';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function ListTournaments() {

    const { Body, Header, HeaderDiv, Main, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, data, isLoading, ok } = selector('tournament', 'getAll');

    const [progress, setProgress] = useQueryParam('progress', 'opened');


    useEffect(() => {
        fetch();
    }, []);


    const access = useCallback((tournamentId: number) => {
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
    }, [])

    const configure = useCallback((tournament: Tournament) => {
        navigate(Routes.editTournament, { state: { tournament } });
    }, [])


    const handleClick = useCallback((value: string) => {
        setProgress(value);
    }, [])


    return (
        <StateFetchHandle
            isLoading={isLoading}
            dataGetted={ok}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                        <p>Torneios</p>
                        {isAdmin() &&
                            <PostLogged.ButtonPlus onClick={() => navigate(Routes.createTournament)} />
                        }
                    </HeaderDiv>
                    <ButtonsSelectors
                        onClick={handleClick}
                        btnSel={progress}
                        buttons={[
                            { name: 'Em Andamento', value: 'opened' },
                            { name: 'Finalizado', value: 'finished' }
                        ]}
                    />
                </Header>
                <Main>
                    <div className={styles.list}>
                        {progress && data[progress]?.map((tournament: Tournament, key: number) => (
                            <ItemListTournament
                                tournament={tournament}
                                funcBtnAccess={access}
                                funcBtnConfigure={configure}
                                key={key}
                            />
                        ))}
                    </div>
                </Main>
            </Body>
        </StateFetchHandle>
    );
}