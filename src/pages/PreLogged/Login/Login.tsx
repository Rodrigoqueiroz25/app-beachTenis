/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate } from 'react-router-dom';
import styles from './styles.module.css';
import imgBeachTenis from 'assets/player-beachTenis.svg';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import { FormLogin } from 'components/PreLoggedin/FormLogin/FormLogin';
import useAuth from 'hooks/fetchApi/useAuth';


export function Login() {

    const { login, error, isAuth, isLoading } = useAuth();

    function handleSubmitForm(data: any) {
        login(data);
    }


    return (
        <div>
            {isLoading &&
                <p>isLoading</p>
            }

            {!isAuth() ?
                <PreLoggedin.Layout
                    header={
                        <div className={styles.containerTitle}>
                            <div className={styles.msgWelcome}>
                                <p>Bem Vindo </p>
                                <p className={styles.back}>de Volta <img src={imgBeachTenis} alt="" /></p>
                            </div>
                        </div>
                    }
                    main={
                        <FormLogin
                            submit={handleSubmitForm}
                            error={error}
                        />
                    }
                    footer={
                        <LinkOtherPage text="Não tem registro?" textLink='Inscreva-se' endPoint='/signup' />
                    }
                />
                : <Navigate to={Routes.home} />
            }
        </div>
    );
}
