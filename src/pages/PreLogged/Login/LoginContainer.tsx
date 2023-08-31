
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import styles from './styles.module.css';
import useVerifyAuth from 'hooks/useVerifyAuth';
import imgBeachTenis from 'assets/player-beachTenis.svg';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import { FormLogin } from './Presentation/FormLogin';
import useFetchAccount from 'hooks/useFetchAccount';


export function LoginContainer() {

    const navigate = useNavigate();
    const { authenticate } = useFetchAccount();
    const itsAuth = useVerifyAuth();

    function handleSubmitForm(data: any) {
        authenticate.login(data);
    }

    useEffect(() => {
        if (itsAuth()) {
            navigate(Routes.home);
        }
    }, []);

    return (
        <div>

            {authenticate.isLoading &&
                <p>isLoading</p>
            }

            {!authenticate.ok ?
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
                            error={authenticate.error}
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
