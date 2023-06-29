
import styles from './Login.module.css';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';
import { TextField } from '../../components/TextField/TextField';
import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import useVerifyAuth from '../../hooks/useVerifyAuth';
import useAuth from '@/hooks/useAuth';



export function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const { authenticate, isAuth, isLoading, error } = useAuth();

    const itsAuth = useVerifyAuth();
    
    function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        authenticate(email, passwd);
    }
    
    useEffect(() => {
        if(itsAuth()){
            navigate('/home');
        }
    },[]);

    return (
        <div className={styles.login}>
            
            { isLoading && 
                <p>isLoading</p>
            }
            
            { !isAuth ?
                <>
                    <HeaderLogin>
                        <div className={styles.containerTitle}>
                            <div className={styles.msgWelcome}>
                                <p>Welcome</p>
                                <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p>
                            </div>
                        </div>
                     </HeaderLogin>
    
                    <main>
                        <form className={styles.form} onSubmit={handleSubmitForm}>
                            <TextField
                                placeholder='E-mail'
                                type='text'
                                name='email'
                                value={email}
                                func={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                src={imgMail}
                            />
                            <TextField
                                placeholder='Password'
                                type='password'
                                name='passwd'
                                value={passwd}
                                func={(e: ChangeEvent<HTMLInputElement>) => setPasswd(e.target.value)}
                                src={imgEye}
                            />
                            
                            <div className={styles.forgotPasswd}>
                                <Link className={styles.link} to="/forgot-password">Forgot Password?</Link>
                            </div>

                            {!isAuth &&
                                <div className={styles.msgErroLogin}>
                                    <p>{error}</p>
                                </div>
                            }

                            <Button text='Log in' />
                        </form>
                    </main>
                    
                    <footer className={styles.footer}>
                        <FooterLogin text="Don't have a register?" textLink='Sign up' endPoint='/signup' />
                    </footer>
                </>  

            : 
                <Navigate to='/home'/>
            }


        </div>

    );
}
