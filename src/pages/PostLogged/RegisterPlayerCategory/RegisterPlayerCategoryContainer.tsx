/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { useEffect, useState } from 'react';
import useRegisterPlayerCategory from 'hooks/useRegisterPlayerCategory';
import search from 'assets/searchbx.svg';
import useAccount from 'hooks/useAccount';
import { ListPlayers } from './Presentation/ListPlayers/ListPlayers';
import { ListResultSearch } from './Presentation/ListResultSearch/ListResultSearch';

export function RegisterPlayerCategoryContainer() {

    const navigate = useNavigate();
    // const location = useLocation();
    const { state: { category } } = useLocation();

    const [textSearch, setTextSearch] = useState('');
    const [presentation, setPresentation] = useState('listaDuplas');

    const { getPlayersRegisteredByCategory, registerPlayerInCategory } = useRegisterPlayerCategory();
    const { getAccountByName } = useAccount();

    useEffect(() => {
        if(!category){
            navigate(Routes.listTournaments);
        }
    },[]);

    useEffect(() => {
        getPlayersRegisteredByCategory.get(category.id);
    }, [getPlayersRegisteredByCategory.error]);

    function handleClickButtonSearch() {
        setPresentation('listaBusca')
        getAccountByName.get(textSearch);
    }

    function handleClickButtonInscription(idPlayer: string) {
        //request
        setPresentation('listaDuplas')

    }

    return (
        <PostLogged.LayoutPage.Layout
            header={
                <PostLogged.LayoutPage.Header>
                    <PostLogged.ButtonBack onClick={() => navigate(`${Routes.tournamentLessParam}/${category.tournamentId}`)} />
                    <p>{category.description}</p>
                </PostLogged.LayoutPage.Header>
            }
            main={
                <>
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
                    {presentation === 'listaDuplas' ?
                        <ListPlayers listPlayers={getPlayersRegisteredByCategory.playersRecords!} />
                    : presentation === 'listaBusca' &&
                        <ListResultSearch players={getAccountByName.accounts!} handleClick={handleClickButtonInscription} />
                    }
                </>
            }
        />
    )
}