
import styles from './ListTournaments.module.css';
import { FooterHome } from '@/components/FooterHome/FooterHome';
import { ItemListTournaments } from './components/ItemListTournaments/ItemListTournaments';
import { useEffect } from 'react';
import { ButtonBack } from '@/components/ButtonBack/ButtonBack';
import useFetchData from '@/hooks/useFetchData';
import { ITournamentRegistered } from '@/interfaces/ITournament';


export function ListTournaments(){

    const { fetchData, data, error, isLoading, ok } = useFetchData<ITournamentRegistered[]>();

    useEffect(() => {
        fetchData('GET', 'tournaments');
    }, [error]);

    return (    
        <div className={styles.container}>
            
            <header className={styles.title}>
                <ButtonBack endPoint='/home'/>
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