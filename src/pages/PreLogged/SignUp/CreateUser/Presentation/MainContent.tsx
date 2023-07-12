
import { ChangeEvent, FormEvent, useState } from 'react';


import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';
import styles from '../styles.module.css';

import { Button } from '@/components/Button/Button';

import { PreLoggedin } from '@/components/PreLoggedin';



interface MainContentProps {
    phoneNumber: string
    setPhoneNumber: (p: string) => void
    email: string
    setEmail: (p: string) => void
    password: string
    setPassword: (p: string) => void
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
}

interface Prop {
    props: MainContentProps;
}


export function MainContent({ props }: Prop) {

    const [passwd, setPasswd] = useState("");
    const [rePasswd, setRePasswd] = useState("");
    const [msgPasswdDiff, setMsgPasswdDiff] = useState("");


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (passwd === rePasswd) {
            props.setPassword(passwd);
            props.handleSubmit(e);
        }
        else {
            setMsgPasswdDiff("campo senha e repetir senha diferentes");
        }
    }

    return (

        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputPhoneNumber}>
                <p>+55</p>
                <PreLoggedin.Input
                    placeholder="Phone Number"
                    mask="(00) 00000-0000"
                    type='tel'
                    value={props.phoneNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => props.setPhoneNumber(e.target.value)}
                />
            </div>

            <PreLoggedin.Input
                placeholder='E-mail'
                type='email'
                src={imgMail}
                value={props.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.setEmail(e.target.value)}
            />
            <PreLoggedin.Input
                placeholder='Password'
                type='password'
                src={imgEye}
                value={passwd}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPasswd(e.target.value)}
            />
            <PreLoggedin.Input
                placeholder='Repeat Password'
                type='password'
                src={imgEye}
                value={rePasswd}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRePasswd(e.target.value)}
            />

            <div className={styles.msgPasswdDiff}>
                <p>{msgPasswdDiff}</p>
            </div>
            <Button>Signup</Button>
        </form>



    );


}