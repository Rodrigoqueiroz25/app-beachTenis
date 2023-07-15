
import { useEffect } from 'react';

import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';

import { useNavigate } from 'react-router-dom';

import { PostLogged } from '@/components/PostLogged';
import { isAdmin } from '@/helper/isAdmin';
import { List } from './Presentation/List';



export function ListTournamentsContainer() {

    const { fetchData, data, error, isLoading, ok } = useFetchData<ITournamentRegistered[]>();
    const { getCookieToken } = useCookiesSession();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(Requests.getTournaments(getCookieToken()));
    }, [error]);


    return (

        <PostLogged.Layout
            header={
                <>
                    <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    <p>Torneios</p>
                    {isAdmin() &&
                        <PostLogged.ButtonPlus onClick={() => navigate(Routes.addTournament)} />
                    }
                </>
            }
            main={
                <List listTournaments={data} />
            }
        />
    );
}