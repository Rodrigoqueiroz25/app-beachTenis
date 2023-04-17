
import styles from './Login.module.css';
import img from '../../assets/Subtract.svg';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { BarraCurvada } from '../../components/BarraCurvada/BarraCurvada';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';
import { CampoTexto } from '../../components/CampoTexto/CampoTexto';


export function Login() {
    return (
        <div className={styles.login}>
            <header className={styles.cabecalho}>
                <BarraCurvada />
                <div className={styles.msgWelcome}>
                    <p>Welcome</p>
                    <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p> 
                </div>
            </header>
            <main>
                <form className={styles.form} action="post">
                    <CampoTexto placeholder='E-mail' type='email' src={imgMail}/>
                    <CampoTexto placeholder='Password' type='password' src={imgEye}/>
                    
                    <div className={styles.forgotPasswd}>
                        <p>Forgot Password?</p>
                    </div>
                    <Button texto='Log in'/>
                </form>
            </main>
            <FooterLogin texto='Não tem cadastro?' link='Cadastre-se'/>
            
        </div>


    );
}
