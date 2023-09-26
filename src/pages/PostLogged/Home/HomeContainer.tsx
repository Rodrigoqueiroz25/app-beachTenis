/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import { HeaderHome } from './presentation/HeaderHome';
import { MainContentHome } from './presentation/MainContentHome';
import { City } from 'models/City';
import useCookiesSession from 'hooks/useCookiesSession';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';

export function HomeContainer() {

    const { getCookieNameUser } = useCookiesSession();

    const { selector } = useSelectorMethodFetch();
    const cities = selector('city', 'getAll');
    const tournaments = selector('tournament', 'getAll');
    
    useEffect(() => {
        cities.fetch();
        tournaments.fetch();
    },[]);

    return (
        <PostLogged.LayoutPage.Layout
            header={
                <HeaderHome nameUser={getCookieNameUser()?.split(' ')[0]!}/>
            }
            main={
                <MainContentHome 
                    cities={City.toOptionCombobox(cities.data)}
                    tournaments={tournaments.data.opened}
                />
            }
        />
    );
}