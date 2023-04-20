
import { CurvedBar } from '../../components/CurvedBar/CurvedBar';
import styles from './RegisterUser.module.css';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';

export function RegisterUser(){
    return (
        <div className={styles.RegisterUser}>
            <CurvedBar/>
            <header className={styles.header}>
                <div className={styles.msgWelcome}>
                    <p>Hey <br /> Welcome</p>
                    <img src={imgBeachTenis} alt="" />
                </div>
            </header>
            <main>
                <form className={styles.form} action="post">
                    <div className={styles.inputPhoneNumber}>
                        <p>+55</p>
                        <TextField placeholder='Phone Number' type='tel'/>
                    </div>
                    
                    <TextField placeholder='E-mail' type='email' src={imgMail}/>
                    <TextField placeholder='Password' type='password' src={imgEye}/>
                    <Button text='Sign Up'/>
                </form>
            </main>
            <FooterLogin text='Already a Member?' link='Log in'/>
        
        </div>
    );
}