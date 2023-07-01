
import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './FormCreateUser.module.css';
import imgBeachTenis from '@/assets/player-beachTenis.svg';
import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';

import { HeaderLogin } from '@/components/HeaderLogin/HeaderLogin';
import { TextField } from '@/components/TextField/TextField';
import { Button } from '@/components/Button/Button';
import { FooterLogin } from '@/components/FooterLogin/FooterLogin';
import { Routes } from '@/enums/routes.enum';


type FormCreateUserProps = {
    phoneNumber: string
    setPhoneNumber: (p: string) => void
    email: string
    setEmail: (p: string) => void
    password: string
    setPassword: (p: string) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

type Prop = {
    props: FormCreateUserProps;
}


export function FormCreateUser( {props}: Prop){

    const [passwd, setPasswd] = useState("");
    const [rePasswd, setRePasswd] = useState("");
    const [msgPasswdDiff, setMsgPasswdDiff] = useState("");


    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(passwd === rePasswd){
            props.setPassword(passwd);
            props.handleSubmit(e);
        }
        else{
            setMsgPasswdDiff("campo senha e repetir senha diferentes");
        } 
    }

    return (
        <div className={styles.container}>
            <HeaderLogin>
                <div className={styles.containerTitle}>        
                    <div className={styles.msgWelcome}>
                        <p>Hey <br /> Welcome</p>
                        <img src={imgBeachTenis} alt="" />     
                    </div>
                </div>
            </HeaderLogin>
            <main>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputPhoneNumber}>
                        <p>+55</p>
                        <TextField 
                            placeholder="Phone Number"
                            mask="(00) 00000-0000"
                            type='tel'
                            value={props.phoneNumber}
                            func={(e: ChangeEvent<HTMLInputElement>) => props.setPhoneNumber(e.target.value)}
                        />
                    </div>
                    
                    <TextField 
                        placeholder='E-mail' 
                        type='email' 
                        src={imgMail}
                        value={props.email}
                        func={(e: ChangeEvent<HTMLInputElement>) => props.setEmail(e.target.value)}    
                    />
                    <TextField 
                        placeholder='Password' 
                        type='password' 
                        src={imgEye}
                        value={passwd}
                        func={(e: ChangeEvent<HTMLInputElement>) => setPasswd(e.target.value)}
                    />
                    <TextField 
                        placeholder='Repeat Password' 
                        type='password' 
                        src={imgEye}
                        value={rePasswd}
                        func={(e: ChangeEvent<HTMLInputElement>) => setRePasswd(e.target.value)}
                    />

                    <div className={styles.msgPasswdDiff}>
                        <p>{msgPasswdDiff}</p>
                    </div>
                    <Button text='Sign Up'/>
                </form>
            </main>
            <FooterLogin text='Already a Member?' textLink='Log in' endPoint={Routes.login}/>
        
        </div>

    );

    
}