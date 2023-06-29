
import { Navigate, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';

import styles from './Login.module.css';
import useVerifyAuth from '@/hooks/useVerifyAuth';
import useAuth from '@/hooks/useAuth';
import { LoginForm } from './LoginForm';


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
                : <Navigate to='/home'/> 
            }
        </div>
    );
}
