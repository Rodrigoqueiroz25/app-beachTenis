
import styles from './ForgotPasswd.module.css';
import imgForgotPasswd from '@/assets/forgot_password.svg';
import { Button } from '@/components/Button/Button';
import { PreLoggedin } from '@/components/PreLoggedin';
import { Link } from 'react-router-dom';

export function ForgotPasswd() {

    return (
        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.questForgotPasswd}>Forgot Your Password?</p>
                </div>
            }
            main={
                <main className={styles.containerMain}>
                    <img className={styles.imgForgotPasswd} src={imgForgotPasswd} alt="" />
                    <p className={styles.textForgotPasswd}>Enter your registered E-mail Address below <br /> to receive password reset instruction</p>
                    <form className={styles.form} action="">
                        <PreLoggedin.Input placeholder='E-mail / Phone Number' type='text' />
                        <div>
                            <p className={styles.txtRememberPasswd}>
                                Remember Password?
                                <Link className={styles.linkToLoginScreen} to='/login'>Log in</Link>
                            </p>
                        </div>
                        <Button>Enviar</Button>
                    </form>
                </main>
            }
        />
    );
}