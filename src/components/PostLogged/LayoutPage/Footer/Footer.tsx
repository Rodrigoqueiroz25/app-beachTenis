
import styles from './Footer.module.css';
import imgHome from 'assets/home.svg'
import imgHistory from 'assets/history.svg'
import imgProfile from 'assets/profile.svg'
import imgWallet from 'assets/wallet.svg'
import { useNavigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';


export function Footer() {

    const navigate = useNavigate();

    return (
        <footer className={styles.footer}>
            <div className={styles.menuBottom}>
                <div className={styles.option} id='home' onClick={() => navigate(Routes.home)}>
                    <img src={imgHome} alt="imagem de casa" />
                    <p>Home</p>
                </div>
                <div className={styles.option} id='history'>
                    <img src={imgHistory} alt="imagem de historico" />
                    <p>Histórico</p>
                </div>
                <div className={styles.option} id='payment'>
                    <img src={imgWallet} alt="imagem de carteira" />
                    <p>Pagamentos</p>
                </div>
                <div className={styles.option} id='profile' onClick={() => navigate(Routes.editProfile)}>
                    <img src={imgProfile} alt="imagem de perfil vazia" />
                    <p>Perfil</p>
                </div>
            </div>

        </footer>
    );
}