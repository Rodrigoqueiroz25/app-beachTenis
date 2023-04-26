
import styles from './Login.module.css';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';
import { TextField } from '../../components/TextField/TextField';
import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import { Link } from 'react-router-dom';


export function Login() {
    return (
        <div className={styles.login}>
            <HeaderLogin>
                <div className={styles.containerTitle}>        
                    <div className={styles.msgWelcome}>
                        <p>Welcome</p>
                        <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p> 
                    </div>
                </div>
            </HeaderLogin>
            
            <main>
                <form className={styles.form} action="post">
                    <TextField placeholder='E-mail' type='email' src={imgMail}/>
                    <TextField placeholder='Password' type='password' src={imgEye}/>
                    
                    <div className={styles.forgotPasswd}>
                        <Link className={styles.link} to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <Button text='Log in'/>
                </form>
            </main>
            <FooterLogin text="Don't have a register?" textLink='Sign up' endPoint=''/>
            
        </div>


    );
}
