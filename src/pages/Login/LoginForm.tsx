
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';

import styles from './Login.module.css';
import imgBeachTenis from '@/assets/player-beachTenis.svg';
import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';
import { Button } from '@/components/Button/Button';
import { FooterLogin } from '@/components/FooterLogin/FooterLogin';
import { TextField } from '@/components/TextField/TextField';
import { HeaderLogin } from '@/components/HeaderLogin/HeaderLogin';


type Props = {
    emailValue: string;
    setEmailValue: (p: string) => void;
    passwdValue: string;
    setPasswdValue: (p: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isAuth: boolean;
    error: string;
}

export function LoginForm(props: Props) {

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
                <form className={styles.form} onSubmit={props.handleSubmit}>
                    <TextField
                        placeholder='E-mail'
                        type='text'
                        name='email'
                        value={props.emailValue}
                        func={(e: ChangeEvent<HTMLInputElement>) => props.setEmailValue(e.target.value)}
                        src={imgMail}
                    />
                    <TextField
                        placeholder='Password'
                        type='password'
                        name='passwd'
                        value={props.passwdValue}
                        func={(e: ChangeEvent<HTMLInputElement>) => props.setPasswdValue(e.target.value)}
                        src={imgEye}
                    />

                    <div className={styles.forgotPasswd}>
                        <Link className={styles.link} to="/forgot-password">Forgot Password?</Link>
                    </div>

                    {!props.isAuth &&
                        <div className={styles.msgErroLogin}>
                            <p>{props.error}</p>
                        </div>
                    }

                    <Button text='Log in' />
                </form>
            </main>

            <FooterLogin text="Don't have a register?" textLink='Sign up' endPoint='/signup' />
            
        </div>

    );
}
