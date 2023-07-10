
import styles from './CreatePasswd.module.css';
import imgCreatePasswd from '@/assets/create_passwd.svg';
import { Button } from '@/components/Button/Button';
import { PreLoggedin } from '@/components/PreLoggedin';


export function CreatePasswd() {
    return (
        
        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <p className={styles.title}>Create New Password</p>
                </div>
            }
            main={
                <main className={styles.containerMain}>
                <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
                <p className={styles.description}>Your New Password must be different from <br /> previous used Passwords</p>
                <form className={styles.form} action="post">
                    <PreLoggedin.Input placeholder='Enter New Password' type='text'/>
                    <PreLoggedin.Input placeholder='Reenter New Password' type='text'/>
                    <Button>Login</Button>
                </form>                
            </main>
            }
        />
    );
}