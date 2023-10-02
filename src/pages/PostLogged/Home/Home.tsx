/* eslint-disable react-hooks/exhaustive-deps */

import { PostLogged } from 'components/PostLogged';
import { HeaderHome } from './components/HeaderHome/HeaderHome';
import { MainContentHome } from './components/MainContentHome';
import { City } from 'models/City';
import useCookiesSession from 'hooks/useCookiesSession';
import { useHome } from './hooks/useHome';


export function Home() {

    const { getCookieNameUser } = useCookiesSession();
    const { Header, Main, Body, StateFetchHandle } = PostLogged.Layout();

    const { cities, tournaments, isLoading, ok } = useHome();

    return (
        <StateFetchHandle isLoading={isLoading} dataGetted={ok}>
            <Body>
                <Header>
                    <HeaderHome nameUser={getCookieNameUser()?.split(' ')[0]!} />
                </Header>
                <Main>
                    <MainContentHome
                        cities={City.toOptionCombobox(cities)}
                        tournaments={tournaments}
                    />
                </Main>
            </Body>
        </StateFetchHandle>

    );
}