/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { useEffect, useState } from 'react';
import { ListPlayers } from './components/ListPlayers/ListPlayers';
import { ListResultSearch } from './components/ListResultSearch/ListResultSearch';
import { Category } from 'models/Category';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { ListPlayersSelected } from './components/ListPlayersSelected/ListPlayersSelected';
import { UserAccount } from 'models/UserAccount';
import { InputSearch } from './components/InputSearch/InputSearch';


export function RegisterPlayerCategory() {

    const { Body, Header, HeaderDiv, Main, StateFetchHandle } = PostLogged.Layout();

    const navigate = useNavigate();
    const { state: { category } }: { state: { category: Category } } = useLocation();

    const { selector } = useSelectorMethodFetch();
    const getUser = selector('userAccount', 'getOtherByName');
    const teams = selector('category', 'getRegisteredTeams');
    const registerTeam = selector('category', 'registerTeam');
    const removeTeam = selector('category', 'removeTeam');
    const [searchParams, setSearchParams] = useSearchParams({ display: 'teamsRegistered' });
    const display = searchParams.get('display');

    const [playersSelected, setPlayersSelected] = useState<UserAccount[]>([]);

    const isCompleteTeam = playersSelected.length === Number(category.numberAthletesPerRegistration) - 1;

    if(!category){
        navigate(Routes.listTournaments);
    }

    function handleSearchParams(display: 'teamsRegistered' | 'searchedNames' | 'playersSelected', search?: string) {
        setSearchParams(prev => {
            prev.set('display', display)
            if (search) {
                prev.set('search', search);
            } else {
                prev.delete('search');
            }
            return prev
        }, { state: { category } })
    }

    useEffect(() => {
        if (category) {
            teams.fetch(category.id);
        }
    }, [category]);

    useEffect(() => {
        if (registerTeam.ok || removeTeam.ok) {
            handleSearchParams('teamsRegistered');
            teams.fetch(category.id);
        }
    }, [registerTeam.ok, removeTeam.ok]);


    function handleClickButtonSearch(str: string) {
        if (!isCompleteTeam) {
            getUser.fetch(str);
            handleSearchParams('searchedNames', str);
        }
    }

    function handleClickButtonInscription(player: UserAccount) {
        if (!isCompleteTeam) {
            setPlayersSelected([...playersSelected, player]);
            handleSearchParams('playersSelected');
        }
    }

    function handleClickDeleteTeam(teamId: number) {
        removeTeam.fetch(teamId);
    }

    function handleClickRemovePlayerSelected(idPlayer: number) {
        console.log(idPlayer)
        let arr = playersSelected.filter((player, i) => player.id !== idPlayer);
        if (arr) {
            setPlayersSelected([...arr]);
        }
    }

    function handleClickButtonCancel() {
        setPlayersSelected([]);
        handleSearchParams('teamsRegistered');
    }

    function handleClickButtonConfirm() {
        if (isCompleteTeam) {
            let str = playersSelected.map((player) => player.id).join(',');
            registerTeam.fetch(category.id, str);
            setPlayersSelected([]);
        }
    }

    const displayComponents = {
        teamsRegistered: (
            <StateFetchHandle isLoading={teams.isLoading} dataGetted={teams.ok}>
                <ListPlayers listPlayers={teams.data} removeTeam={handleClickDeleteTeam} />
            </StateFetchHandle>
        ),
        searchedNames: (
            <StateFetchHandle isLoading={getUser.isLoading} dataGetted={getUser.ok}>
                <ListResultSearch players={getUser.data} handleClick={handleClickButtonInscription} />
            </StateFetchHandle>
        ),
        playersSelected: (
            <ListPlayersSelected
                playersSelected={playersSelected}
                removePlayerSelected={handleClickRemovePlayerSelected}
                onCancel={handleClickButtonCancel}
                onConfirm={handleClickButtonConfirm}
            />
        ),
    };

    const componentToRender = display ? (displayComponents[display] || <></>) : "";


    return (
        <>
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(`${Routes.tournamentLessParam}/${category.linkedToTournament}`)} />
                        <p>{category.description}</p>
                    </HeaderDiv>
                </Header>
                <Main>
                    <InputSearch
                        isCompleteTeam={isCompleteTeam}
                        onClickButtonSearch={handleClickButtonSearch}
                    />
                    {componentToRender}
                </Main>
            </Body>
        </>
    )
}