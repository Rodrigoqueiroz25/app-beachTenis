
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';

import styles from '../styles.module.css';
import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';
import { Button } from '@/components/Button/Button';
import { Routes } from '@/enums/routes.enum';
import { PreLoggedin } from '@/components/PreLoggedin';


interface MainContentProps {
    emailValue: string;
    setEmailValue: (p: string) => void;
    passwdValue: string;
    setPasswdValue: (p: string) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    isAuth: boolean;
    error: string;
}

export function MainContent(props: MainContentProps) {

    return (

        <form className={styles.form} onSubmit={props.handleSubmit}>
            <PreLoggedin.Input
                placeholder='E-mail'
                type='text'
                name='email'
                value={props.emailValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setEmailValue(e.target.value)}
                src={imgMail}
            />
            <PreLoggedin.Input
                placeholder='Password'
                type='password'
                name='passwd'
                value={props.passwdValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setPasswdValue(e.target.value)}
                src={imgEye}
            />

            <div className={styles.forgotPasswd}>
                <Link className={styles.link} to={Routes.forgotPasswd}>Forgot Password?</Link>
            </div>

            {!props.isAuth &&
                <div className={styles.msgErroLogin}>
                    <p>{props.error}</p>
                </div>
            }

            <Button>Login</Button>
        </form>

    );
}
