/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import { HeaderHome } from './components/HeaderHome/HeaderHome';
import { MainContentHome } from './components/MainContentHome';
import { City } from 'models/City';
import useCookiesSession from 'hooks/useCookiesSession';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';


export function Home() {

    const { getCookieNameUser } = useCookiesSession();
    const { Header, Main, Body, StateFetchHandle } = PostLogged.Layout();
    
    const { selector } = useSelectorMethodFetch();
    const cities = selector('city', 'getAll');
    const tournaments = selector('tournament', 'getAll');

    useEffect(() => {
        cities.fetch();
        tournaments.fetch();
    }, []);

    const isLoading = cities.isLoading || tournaments.isLoading;
    const ok = cities.ok && tournaments.ok;


    return (
        <StateFetchHandle isLoading={isLoading} dataGetted={ok}>
            <Body>
                <Header>
                    <HeaderHome nameUser={getCookieNameUser()?.split(' ')[0]!} />
                </Header>
                <Main>
                    <MainContentHome
                        cities={City.toOptionCombobox(cities.data)}
                        tournaments={tournaments.data.opened}
                    />
                </Main>
            </Body>
        </StateFetchHandle>

    );
}