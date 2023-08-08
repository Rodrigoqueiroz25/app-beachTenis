/* eslint-disable react-hooks/exhaustive-deps */

import useCookiesSession from 'hooks/useCookiesSession';
import { PostLogged } from 'components/PostLogged';
import { HeaderHome } from './presentation/HeaderHome';
import { MainContent } from './presentation/MainContent';
import useCities from 'hooks/useCities';
import useTournament from 'hooks/useTournament';
import { useEffect } from 'react';

export function HomeContainer() {

    const { getCookieNameUser } = useCookiesSession();

    const fetchCities = useCities();
    const { getAllTournaments } = useTournament();

    useEffect(() => {
        getAllTournaments.getAll();
    },[getAllTournaments.error]);

    return (
        <PostLogged.LayoutPage.Layout
            header={
                <HeaderHome nameUser={getCookieNameUser()?.split(' ')[0]!}/>
            }
            main={
                <MainContent 
                    cities={fetchCities.cities}
                    tournaments={getAllTournaments.tournaments?.finished!}
                />
            }
        />
    );
}