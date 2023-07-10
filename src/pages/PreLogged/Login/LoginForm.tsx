
import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent } from 'react';

import styles from './Login.module.css';
import imgBeachTenis from '@/assets/player-beachTenis.svg';
import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';
import { Button } from '@/components/Button/Button';
import { Routes } from '@/enums/routes.enum';
import { PreLoggedin } from '@/components/PreLoggedin';
import { LinkOtherPage } from '@/components/PreLoggedin/LinkOtherPage/LinkOtherPage';


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

        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <div className={styles.msgWelcome}>
                        <p>Welcome</p>
                        <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p>
                    </div>
                </div>
            }
            main={
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
            }
            footer={
                <LinkOtherPage text="Don't have a register?" textLink='Sign up' endPoint='/signup' />
            }
        />
        // <div className={styles.login}>
        //     <HeaderLogin>
        //         <div className={styles.containerTitle}>
        //             <div className={styles.msgWelcome}>
        //                 <p>Welcome</p>
        //                 <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p>
        //             </div>
        //         </div>
        //     </HeaderLogin>

        //     <main>
        //         <form className={styles.form} onSubmit={props.handleSubmit}>
        //             <TextField
        //                 placeholder='E-mail'
        //                 type='text'
        //                 name='email'
        //                 value={props.emailValue}
        //                 func={(e: ChangeEvent<HTMLInputElement>) => props.setEmailValue(e.target.value)}
        //                 src={imgMail}
        //             />
        //             <TextField
        //                 placeholder='Password'
        //                 type='password'
        //                 name='passwd'
        //                 value={props.passwdValue}
        //                 func={(e: ChangeEvent<HTMLInputElement>) => props.setPasswdValue(e.target.value)}
        //                 src={imgEye}
        //             />

        //             <div className={styles.forgotPasswd}>
        //                 <Link className={styles.link} to={Routes.forgotPasswd}>Forgot Password?</Link>
        //             </div>

        //             {!props.isAuth &&
        //                 <div className={styles.msgErroLogin}>
        //                     <p>{props.error}</p>
        //                 </div>
        //             }

        //             <Button>Login</Button>
        //         </form>
        //     </main>

        //     <FooterLogin text="Don't have a register?" textLink='Sign up' endPoint='/signup' />
            
        // </div>

    );
}
