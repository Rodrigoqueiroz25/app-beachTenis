
import styles from './ListTournaments.module.css';
import setLeft from '../../assets/set_left.svg';
import { FooterHome } from '../../components/FooterHome/FooterHome';
import { ItemListTournaments } from './components/ItemListTournaments/ItemListTournaments';

export function ListTournaments(){
    return (
        
        <div className={styles.container}>
            
            <header className={styles.title}>
                <img src={setLeft} alt="" />
                <p>Torneios</p>
            </header>
            
            <main className={styles.main}>
                <div className={styles.list}>
                    <ItemListTournaments/>
                </div>
            </main>
            
            <FooterHome/>
            
        </div>
        
    );
}