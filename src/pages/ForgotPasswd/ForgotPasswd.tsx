

import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import styles from './ForgotPasswd.module.css';
import imgForgotPasswd from '../../assets/forgot_password.svg';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import imgRectangle from '../../assets/Rectangle.svg';

export function ForgotPasswd(){
    return (
        <div className={styles.forgotPasswd}>
            <HeaderLogin>
                <div className={styles.containerTitle}>
                    <p className={styles.questForgotPasswd}>Forgot Your Password?</p>
                </div>
            </HeaderLogin>
            
            <main className={styles.containerMain}>
                <img className={styles.imgForgotPasswd} src={imgForgotPasswd} alt="" />
                <p className={styles.textForgotPasswd}>Enter your registered E-mail Address below <br /> to receive password reset instruction</p>
                <form className={styles.form} action="">
                    <TextField placeholder='E-mail / Phone Number' type='text'/>
                    <div>
                        <p className={styles.linkToLoginScreen}>Remember Password? <span>Log in</span></p>
                    </div>
                    <Button text='Submit'/>
                </form>                
            </main>
            
            <footer className={styles.imgRetangle}>
                <img src={imgRectangle} alt="" />
            </footer>
        </div>
    );
}