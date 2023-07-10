
import { Navigate, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import styles from './Login.module.css';
import useVerifyAuth from '@/hooks/useVerifyAuth';
import useAuth from '@/hooks/useAuth';
import { LoginForm } from './LoginForm';
import { Routes } from '@/enums/routes.enum';


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
            navigate(Routes.home);
        }
    },[]);

    return (
        <div>
            
            { isLoading && 
                <p>isLoading</p>
            }
            
            { !isAuth 
                ?   <LoginForm 
                        emailValue={email} 
                        passwdValue={passwd} 
                        setEmailValue={setEmail}
                        setPasswdValue={setPasswd}
                        handleSubmit={handleSubmitForm}
                        error={error}
                        isAuth={isAuth}
                    /> 
                : <Navigate to={Routes.home}/> 
            }
        </div>
    );
}
