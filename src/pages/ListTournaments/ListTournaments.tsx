
import styles from './ListTournaments.module.css';
import setLeft from '../../assets/set_left.svg';
import { FooterHome } from '../../components/FooterHome/FooterHome';
import { ItemListTournaments } from './components/ItemListTournaments/ItemListTournaments';
import { useEffect } from 'react';
import useFetchTournament from '../../hooks/useFetchTournament';
import { TournamentRegistered } from '../../types/tournament';


export function ListTournaments(){

    const { getTournaments, data, error, isLoading, ok } = useFetchTournament();

    useEffect(() => {
        getTournaments();
    }, []);

    return (    
        <div className={styles.container}>
            
            <header className={styles.title}>
                <img src={setLeft} alt="" />
                <p>Torneios</p>
            </header>
            
            <main className={styles.main}>
                <div className={styles.list}>
                    {data.map((d: TournamentRegistered, key: number) => (
                        <ItemListTournaments dataTournament={d} key={key}/>
                    ))}
                </div>
            </main>
            
            <FooterHome/>
            
        </div>
        
    );
}