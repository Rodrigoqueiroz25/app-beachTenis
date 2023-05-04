
import styles from './Login.module.css';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';
import { TextField } from '../../components/TextField/TextField';
import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { authenticate } from '../../services/Authentication';
import { useCookies } from 'react-cookie';


export function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =  useState('');
    const [passwd, setPasswd] =  useState('');
    
    const [msgError, setMsgError] = useState('');
    
    const [cookies, setCookies] = useCookies();
    
    
    async function handleSubmitForm(e: SyntheticEvent){
        e.preventDefault();
        const res = await authenticate(email, passwd);    
        if(res.msg === 'Autenticado'){
            setCookies('user_session', res.token, {
                path: '/',
                sameSite: 'strict',
                maxAge: 20000
            });
            setCookies('user_name', res.name_user?.trim(), {
                path: '/',
                sameSite: 'strict',
                maxAge: 20000
            });
            setMsgError('');
            navigate('/home');
            console.log(document.cookie);
        }
        else{
            setMsgError(res.msg);
        }
        
    }

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
                    {msgError &&
                        <div className={styles.msgErroLogin}>
                            <p>Usuário/senha inválidos</p>
                        </div>
                    }
                    <Button text='Log in'/>
                </form>
            </main>
            <FooterLogin text="Don't have a register?" textLink='Sign up' endPoint='/register-user'/>
            
        </div>

    );
}
