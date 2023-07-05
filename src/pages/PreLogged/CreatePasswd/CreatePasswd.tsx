
import styles from './CreatePasswd.module.css';
import { HeaderLogin } from '@/components/HeaderLogin/HeaderLogin';
import imgCreatePasswd from '@/assets/create_passwd.svg';
import { TextField } from '@/components/TextField/TextField';
import { Button } from '@/components/Button/Button';
import imgRectangle from '@/assets/Rectangle.svg';

export function CreatePasswd(){
    return (
        <div className={styles.createPasswd}>
            <HeaderLogin>
                <div className={styles.containerTitle}>
                    <p className={styles.title}>Create New Password</p>
                </div>
            </HeaderLogin>
            
            <main className={styles.containerMain}>
                <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
                <p className={styles.description}>Your New Password must be different from <br /> previous used Passwords</p>
                <form className={styles.form} action="post">
                    <TextField placeholder='Enter New Password' type='text'/>
                    <TextField placeholder='Reenter New Password' type='text'/>
                    <Button>Login</Button>
                </form>                
            </main>
            
            <footer className={styles.imgRetangle}>
                <img src={imgRectangle} alt="" />
            </footer>
        </div>
    );
}