
import styles from '../styles.module.css';
import imgCreatePasswd from '@/assets/create_passwd.svg';
import { Button } from '@/components/Button/Button';
import { PreLoggedin } from '@/components/PreLoggedin';


export function MainContent() {


    return (

        <main className={styles.containerMain}>
            <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
            <p className={styles.description}>Your New Password must be different from <br /> previous used Passwords</p>
            <form className={styles.form} action="post">
                <PreLoggedin.Input placeholder='Enter New Password' type='text' />
                <PreLoggedin.Input placeholder='Reenter New Password' type='text' />
                <Button>Login</Button>
            </form>
        </main>
    );
}