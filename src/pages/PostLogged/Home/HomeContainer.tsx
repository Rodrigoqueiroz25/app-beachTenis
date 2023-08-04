
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
    const { getTournament } = useTournament();

    useEffect(() => {
        getTournament.get('16');
    },[getTournament.error]);

    return (
        <PostLogged.LayoutPage.Layout
            header={
                <HeaderHome nameUser={getCookieNameUser()?.split(' ')[0]!}/>
            }
            main={
                <MainContent 
                    cities={fetchCities.cities}
                    tournament={getTournament.tournament}
                />
            }
        />
    );
}