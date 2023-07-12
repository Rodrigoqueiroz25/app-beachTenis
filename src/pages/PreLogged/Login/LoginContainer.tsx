
import { Navigate, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.css';
import useVerifyAuth from '@/hooks/useVerifyAuth';
import useAuth from '@/hooks/useAuth';
import imgBeachTenis from '@/assets/player-beachTenis.svg';
import { Routes } from '@/enums/routes.enum';
import { PreLoggedin } from '@/components/PreLoggedin';
import { LinkOtherPage } from '@/components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import { MainContent } from './Presentation/MainContent';


export function LoginContainer() {

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
        if (itsAuth()) {
            navigate(Routes.home);
        }
    }, []);

    return (
        <div>

            {isLoading &&
                <p>isLoading</p>
            }

            {!isAuth ?
                <PreLoggedin.Layout
                    header={
                        <div className={styles.containerTitle}>
                            <div className={styles.msgWelcome}>
                                <p>Welcome</p>
                                <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p>
                            </div>
                        </div>
                    }
                    main={
                        <MainContent
                            emailValue={email}
                            passwdValue={passwd}
                            setEmailValue={setEmail}
                            setPasswdValue={setPasswd}
                            handleSubmit={handleSubmitForm}
                            error={error}
                            isAuth={isAuth}
                        />
                    }
                    footer={
                        <LinkOtherPage text="Don't have a register?" textLink='Sign up' endPoint='/signup' />
                    }
                />
                : <Navigate to={Routes.home} />
            }
        </div>
    );
}
