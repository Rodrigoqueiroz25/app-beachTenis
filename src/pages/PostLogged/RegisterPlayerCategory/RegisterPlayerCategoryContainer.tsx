/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { useEffect, useState } from 'react';
import search from 'assets/searchbx.svg';
import { ListPlayers } from './Presentation/ListPlayers/ListPlayers';
import { ListResultSearch } from './Presentation/ListResultSearch/ListResultSearch';
import { Category } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function RegisterPlayerCategoryContainer() {

    const { Body, Header, HeaderDiv, Main, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const location = useLocation();
    const { state: { category } }: { state: { category: Category } } = useLocation();

    const [textSearch, setTextSearch] = useState('');
    const [presentation, setPresentation] = useState('listaDuplas');

    const { selector } = useSelectorMethodFetch();
    const getUser = selector('userAccount', 'getOtherByName');
    const teams = selector('category', 'getRegisteredTeams');
    const registerTeam = selector('category', 'registerTeam');

    useEffect(() => {
        if (!category) {
            navigate(Routes.listTournaments);
        }
    }, []);

    useEffect(() => {
        teams.fetch(category.id)
    }, []);

    function handleClickButtonSearch() {
        setPresentation('listaBusca')
        getUser.fetch(textSearch);
    }

    function handleClickButtonInscription(idPlayer: number) {
        registerTeam.fetch(category.id, `${idPlayer}`);
        navigate(location.pathname, { state: { category } })
        setPresentation('listaDuplas')
    }

    return (
        <Body>
            <Header>
                <HeaderDiv>
                    <PostLogged.ButtonBack onClick={() => navigate(`${Routes.tournamentLessParam}/${category.linkedToTournament}`)} />
                    <p>{category.description}</p>
                </HeaderDiv>
            </Header>
            <Main>
                <div className={styles.inputSearch}>
                    <input
                        className={styles.search}
                        type="text"
                        placeholder='Encontre seu parceiro'
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                    />
                    <img onClick={handleClickButtonSearch} src={search} alt="" />
                </div>

                {presentation === 'listaDuplas'
                    ?
                    <StateFetchHandle isLoading={teams.isLoading} dataGetted={teams.ok} >
                        <ListPlayers listPlayers={teams.data} />
                    </StateFetchHandle>
                    :
                    presentation === 'listaBusca' &&
                    <StateFetchHandle isLoading={getUser.isLoading} dataGetted={getUser.ok}>
                        <ListResultSearch players={getUser.data} handleClick={handleClickButtonInscription} />
                    </StateFetchHandle>
                    
                }
            </Main>
        </Body>
    )
}