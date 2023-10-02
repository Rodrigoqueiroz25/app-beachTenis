/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css'
import { useEffect } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { ItemListTournament } from './components/ItemListTournament/ItemListTournament';
import { ButtonsSelectors } from '../../../components/PostLogged/ButtonsSelectors/ButtonsSelectors';
import { Tournament } from 'models/Tournament';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { isAdmin } from 'functions/isAdmin';
import { useQueryParam } from 'hooks/useQueryParam';


export function ListTournaments() {

    const { Body, Header, HeaderDiv, Main, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const { fetch, data, isLoading, ok } = selector('tournament', 'getAll');
    const [progress, setProgress] = useQueryParam('progress', 'opened');


    useEffect(() => {
        fetch();
    }, []);

    function access(tournamentId: number): void {
        navigate(`${Routes.tournamentLessParam}/${tournamentId}`)
    }

    function configure(tournament: Tournament): void {
        navigate(Routes.editTournament, { state: { tournament } });
    }

    function handleClick(value: string) {
        setProgress(value);
    }

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
                        onClick={setProgress} 
                        btnSel={progress}
                        buttons={[
                            {name: 'Em Andamento', value: 'opened' },
                            {name: 'Finalizado', value: 'finished' }
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