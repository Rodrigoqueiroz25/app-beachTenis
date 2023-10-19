/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { useEffect, useState } from 'react';
import searchImg from 'assets/searchbx.svg';
import { ListPlayers } from './components/ListPlayers/ListPlayers';
import { ListResultSearch } from './components/ListResultSearch/ListResultSearch';
import { Category } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';


export function RegisterPlayerCategory() {

    const { Body, Header, HeaderDiv, Main, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const { state: { category } }: { state: { category: Category } } = useLocation();

    const [textSearch, setTextSearch] = useState('');

    const { selector } = useSelectorMethodFetch();
    const getUser = selector('userAccount', 'getOtherByName');
    const teams = selector('category', 'getRegisteredTeams');
    const registerTeam = selector('category', 'registerTeam');

    const [searchParams, setSearchParams] = useSearchParams({display: 'teamsRegistered'});
    const display = searchParams.get('display');


    useEffect(() => {
        if (!category) {
            navigate(Routes.listTournaments);
        }
    }, []);

    useEffect(() => {
        teams.fetch(category.id)
    }, []);

    useEffect(() => {
        if(registerTeam.ok){
            teams.fetch(category.id);
        }
    },[registerTeam.ok]);


    function handleClickButtonSearch() {
        getUser.fetch(textSearch);
        setSearchParams(prev => {
            prev.set('display', 'searchedNames')
            prev.set('search', textSearch)
            return prev
        }, { state:  { category } })
    }

    function handleClickButtonInscription(idPlayer: number) {
        registerTeam.fetch(category.id, `${idPlayer}`);
        setSearchParams(prev => {
            prev.set('display', 'teamsRegistered')
            prev.delete('search')
            return prev
        }, { state:  { category } })
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
                    <img onClick={handleClickButtonSearch} src={searchImg} alt="" />
                </div>

                {display === 'teamsRegistered'
                    ?
                    <StateFetchHandle isLoading={teams.isLoading} dataGetted={teams.ok} >
                        <ListPlayers listPlayers={teams.data} />
                    </StateFetchHandle>
                    :
                    display === 'searchedNames' &&
                    <StateFetchHandle isLoading={getUser.isLoading} dataGetted={getUser.ok}>
                        <ListResultSearch players={getUser.data} handleClick={handleClickButtonInscription} />
                    </StateFetchHandle>
                }
            </Main>
        </Body>
    )
}