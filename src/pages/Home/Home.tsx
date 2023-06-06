
import styles from './Home.module.css';
import imgSearch from '../../assets/search.svg';
import imgBell from '../../assets/bell.svg';
import photoHome from '../../assets/photo_home.svg';
import imgLocation from '../../assets/location.svg'
import photoRanking from '../../assets/photo_ranking.svg';
import imgEvent from '../../assets/Event-2.svg';
import { FooterHome } from '../../components/FooterHome/FooterHome';

export function Home(){
    return (
        
        <div className={styles.home}>
            <header className={`${styles.header} ${styles.paddingPage}`}>
                <div className={styles.photoNameUser}>
                    <img src={photoHome} alt="" />
                    <p>Hey, Alex</p>
                </div>
                <div className={styles.icons}>
                    <img src={imgSearch} alt="" />
                    <img src={imgBell} alt="" />
                </div>
            </header>
            
            <main className={styles.paddingPage}>
                <div className={styles.location}>
                    <img src={imgLocation} alt="" />
                    <p>Aracaju, SE</p>
                </div>
                
                <div className={styles.buttonsChoiceSport}>
                    <button>Beach Tennis</button>
                    <button>Hockey</button> 
                    <button>Tennis</button>
                </div>
                
                <section className={styles.tournaments}>
                    <div className={styles.headerSection}>
                        <p className={styles.title}>Torneios</p>
                        <p className={styles.link}>Ver todos</p>
                    </div>
                    
                    <div className={styles.tournament}>
                        <img src={imgEvent} alt="" />
                    </div>
                </section>
                
                <section className={styles.ranking}>
                    <div className={styles.headerSection}>
                        <p className={styles.title}>Ranking</p>
                        <p className={styles.link}>Ver todos</p>
                    </div>
                    
                    <div className={styles.peoples}>
                        <img src={photoRanking} alt="" />
                        <img src={photoRanking} alt="" />
                        <img src={photoRanking} alt="" />
                        <img src={photoRanking} alt="" />
                        <img src={photoRanking} alt="" />
                    </div>
                </section>
                
            </main>
            
            <FooterHome/>
            
        </div>
        
    );
}