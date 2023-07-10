
import styles from './Footer.module.css';
import imgHome from '@/assets/home.svg'
import imgHistory from '@/assets/history.svg'
import imgProfile from '@/assets/profile.svg'
import imgWallet from '@/assets/wallet.svg'
import { useNavigate } from 'react-router-dom';
import { Routes } from '@/enums/routes.enum';


export function Footer() {

    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <div className={styles.menuBottom}>
                <div className={styles.option} onClick={() => navigate(Routes.home)}>
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
                <div className={styles.option} onClick={() => navigate(Routes.editProfile)}>
                    <img src={imgProfile} alt="" />
                    <p>Perfil</p>
                </div>
            </div>

        </footer>
    );
}