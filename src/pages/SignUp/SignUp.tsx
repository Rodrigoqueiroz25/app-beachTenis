
import styles from './SignUp.module.css';
import imgBeachTenis from '../../assets/player-beachTenis.svg';
import imgMail from '../../assets/Mail.svg';
import imgEye from '../../assets/eye.svg';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { FooterLogin } from '../../components/FooterLogin/FooterLogin';
import { HeaderLogin } from '../../components/HeaderLogin/HeaderLogin';
import { ChangeEvent, FormEvent, useState } from 'react';

export function SignUp(){

    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    
    function changePhone(e: ChangeEvent<HTMLInputElement>){
        setPhone(e.target.value);
    }
    
    function changeEmail(e: ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }
    
    function changePasswd(e: ChangeEvent<HTMLInputElement>){
        setPasswd(e.target.value);
    }
    
    function handleSubmitForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        
    }

    return (
        <div className={styles.signup}>
            <HeaderLogin>
                <div className={styles.containerTitle}>        
                    <div className={styles.msgWelcome}>
                        <p>Hey <br /> Welcome</p>
                        <img src={imgBeachTenis} alt="" />     
                    </div>
                </div>
            </HeaderLogin>
            <main>
                <form className={styles.form} onSubmit={handleSubmitForm}>
                    <div className={styles.inputPhoneNumber}>
                        <p>+55</p>
                        <TextField 
                            placeholder="Phone Number"
                            mask="(00) 00000-0000"
                            type='tel'
                            value={phone}
                            func={changePhone}
                        />
                    </div>
                    
                    <TextField 
                        placeholder='E-mail' 
                        type='email' 
                        src={imgMail}
                        value={email}
                        func={changeEmail}    
                    />
                    <TextField 
                        placeholder='Password' 
                        type='password' 
                        src={imgEye}
                        value={passwd}
                        func={changePasswd}
                    />
                    <Button text='Sign Up'/>
                </form>
            </main>
            <FooterLogin text='Already a Member?' textLink='Log in' endPoint='/login'/>
        
        </div>
    );
}