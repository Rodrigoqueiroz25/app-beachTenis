
import { useEffect } from 'react';

import styles from './ListTournaments.module.css';
import { FooterHome } from '@/components/FooterHome/FooterHome';
import { ItemListTournaments } from './components/ItemListTournaments/ItemListTournaments';
import leftArrow from '@/assets/set_left.svg';
import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';
import { Routes } from '@/enums/routes.enum';
import { Requests } from '@/helper/Requests';
import useCookiesSession from '@/hooks/useCookiesSession';
import { ButtonSwitchScreen } from '@/components/ButtonSwitchScreen/ButtonSwitchScreen';


export function ListTournaments(){

    const { fetchData, data, error, isLoading, ok } = useFetchData<ITournamentRegistered[]>();
    const { getCookieToken } = useCookiesSession();

    useEffect(() => {
        fetchData(Requests.getTournaments(getCookieToken()));
    }, [error]);

    return (    
        <div className={styles.container}>
            
            <header className={styles.title}>
                <ButtonSwitchScreen endPoint={Routes.home} icon={leftArrow}/>
                <p>Torneios</p>
            </header>
            
            <main className={styles.main}>
                <div className={styles.list}>
                    {data?.map((d: ITournamentRegistered, key: number) => (
                        <ItemListTournaments dataTournament={d} key={key}/>
                    ))}
                </div>
            </main>
            
            <FooterHome/>
            
        </div>
        
    );
}