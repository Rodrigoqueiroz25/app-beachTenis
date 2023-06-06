
import { HeaderLogin } from '../../../../components/HeaderLogin/HeaderLogin';
import styles from './FormPhoneEmailPasswd.module.css';
import imgBeachTenis from '../../../../assets/player-beachTenis.svg';
import imgMail from '../../../../assets/Mail.svg';
import imgEye from '../../../../assets/eye.svg';
import { TextField } from '../../../../components/TextField/TextField';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ContextSignup } from '../../../../contexts/ContextSignup';
import { Button } from '../../../../components/Button/Button';
import { FooterLogin } from '../../../../components/FooterLogin/FooterLogin';

type Props = {
    func: any;
}

export function FormPhoneEmailPasswd({ func }: Props){

    const {state, setState} = useContext(ContextSignup);

    const [passwd, setPasswd] = useState("");
    const [rePasswd, setRePasswd] = useState("");

    const [msgPasswdDiff, setMsgPasswdDiff] = useState("");

    
    function changePhone(e: ChangeEvent<HTMLInputElement>){
        setState({...state, phoneNumber: e.target.value})
    }
    
    function changeEmail(e: ChangeEvent<HTMLInputElement>){
        setState({...state, email: e.target.value});
    }
    
    function changePasswd(e: ChangeEvent<HTMLInputElement>){
        // setState({...state, password: e.target.value});
        setPasswd(e.target.value);
        console.log(passwd);
    }
    
    function changeRePasswd(e: ChangeEvent<HTMLInputElement>){
        // setState({...state, password: e.target.value});
        setRePasswd(e.target.value);
        console.log(rePasswd);
    }

    function handleSubmitForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(state);

        if(passwd === rePasswd){
            setState({...state, password: passwd});
            func();
        }
        else{
            setMsgPasswdDiff("campo senha e repetir senha diferentes");
        } 
    }

    return (
        <div className={styles.formPhoneEmailPasswd}>
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
                            value={state.phoneNumber}
                            func={changePhone}
                        />
                    </div>
                    
                    <TextField 
                        placeholder='E-mail' 
                        type='email' 
                        src={imgMail}
                        value={state.email}
                        func={changeEmail}    
                    />
                    <TextField 
                        placeholder='Password' 
                        type='password' 
                        src={imgEye}
                        value={passwd}
                        func={changePasswd}
                    />
                    <TextField 
                        placeholder='Repeat Password' 
                        type='password' 
                        src={imgEye}
                        value={rePasswd}
                        func={changeRePasswd}
                    />

                    <div className={styles.msgPasswdDiff}>
                        <p>{msgPasswdDiff}</p>
                    </div>
                    <Button text='Sign Up'/>
                </form>
            </main>
            <FooterLogin text='Already a Member?' textLink='Log in' endPoint='/login'/>
        
        </div>

    );

    
}