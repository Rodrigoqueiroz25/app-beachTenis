
import { FormEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextSignup } from '@/contexts/ContextSignup';
import { FormCreateUser } from './FormCreateUser';


export function CreateUser(){

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
        navigate('/signup/create-profile', {state: {userCreated: true}});
    }

    return (
        <FormCreateUser props={{
            email: state.email,
            password: state.password,
            phoneNumber: state.phoneNumber,
            setEmail: changeEmail,
            setPassword: changePasswd,
            setPhoneNumber: changePhone,
            handleSubmit: handleSubmitForm,
        }}/>
    );
}