
import { FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextSignup } from '@/contexts/ContextSignup';
import { MainContent } from './Presentation/MainContent';
import { Routes } from '@/enums/routes.enum';
import { PreLoggedin } from '@/components/PreLoggedin';
import { LinkOtherPage } from '@/components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import styles from './styles.module.css';
import imgBeachTenis from '@/assets/player-beachTenis.svg';

export function CreateUserContainer(){

    const {state, setState} = useContext(ContextSignup);
    const navigate = useNavigate();
    

    function changePhone(phone: string){
        setState({...state, phoneNumber: phone});
    }
    
    function changeEmail(email: string){
        setState({...state, email: email});
    }
    
    function changePasswd(passwd: string){
        setState({...state, password: passwd});
    }
    
    function handleSubmitForm(e: FormEvent<HTMLFormElement>){
        navigate(Routes.createProfile, {state: {userCreated: true}});
    }

    return (
        <PreLoggedin.Layout
        header={
            <div className={styles.containerTitle}>        
                <div className={styles.msgWelcome}>
                    <p>Hey <br /> Welcome</p>
                    <img src={imgBeachTenis} alt="" />     
                </div>
            </div>
        }
        main={
            <MainContent props={{
                email: state.email,
                password: state.password,
                phoneNumber: state.phoneNumber,
                setEmail: changeEmail,
                setPassword: changePasswd,
                setPhoneNumber: changePhone,
                handleSubmit: handleSubmitForm,
            }}/>
        }
        footer={
            <LinkOtherPage text='Already a Member?' textLink='Log in' endPoint={Routes.login}/>
        }
        />
        
    );
}