
import styles from './FooterHome.module.css';
import imgHome from '@/assets/home.svg'
import imgHistory from '@/assets/history.svg'
import imgProfile from '@/assets/profile.svg'
import imgWallet from '@/assets/wallet.svg'


export function FooterHome() {
    return (
        <footer className={styles.footer}>
            <div className={styles.menuBottom}>
                <div className={styles.option}>
                    <img src={imgHome} alt="" />
                    <p>Home</p>
                </div>
                <div className={styles.option}>
                    <img src={imgHistory} alt="" />
                    <p>Histórico</p>
                </div>
                <div className={styles.option}>
                    <img src={imgWallet} alt="" />
                    <p>Pagamentos</p>
                </div>
                <div className={styles.option}>
                    <img src={imgProfile} alt="" />
                    <p>Perfil</p>
                </div>
            </div>

        </footer>
    );
}