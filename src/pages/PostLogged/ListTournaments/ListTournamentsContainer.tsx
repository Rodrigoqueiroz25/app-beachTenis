/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { Routes } from 'enums/routes.enum';
import { useNavigate } from 'react-router-dom';
import { PostLogged } from 'components/PostLogged';
import { isAdmin } from 'helper/isAdmin';
import { List } from './Presentation/List';
import useTournament from 'hooks/useTournament';



export function ListTournamentsContainer() {

    const { getAllTournaments } = useTournament();
    const navigate = useNavigate();

    useEffect(() => {
        getAllTournaments.getAll();
    }, [getAllTournaments.error]);


    return (

        <PostLogged.LayoutPage.Layout
            header={
                <PostLogged.LayoutPage.Header>
                    <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    <p>Torneios</p>
                    {isAdmin() &&
                        <PostLogged.ButtonPlus onClick={() => navigate(Routes.createTournament)} />
                    }
                </PostLogged.LayoutPage.Header>
            }
            main={
                <List listTournaments={getAllTournaments.tournaments} />
            }
        />
    );
}