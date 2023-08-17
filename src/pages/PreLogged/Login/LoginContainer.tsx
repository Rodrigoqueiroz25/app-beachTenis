
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect} from 'react';
import styles from './styles.module.css';
import useVerifyAuth from 'hooks/useVerifyAuth';
import imgBeachTenis from 'assets/player-beachTenis.svg';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import { MainContent } from './Presentation/MainContent';
import useAccount from 'hooks/useAccount';


export function LoginContainer() {

    const navigate = useNavigate();
    const { authenticate } = useAccount();
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
                                <p>Welcome</p>
                                <p className={styles.back}>Back <img src={imgBeachTenis} alt="" /></p>
                            </div>
                        </div>
                    }
                    main={
                        <MainContent
                            submit={handleSubmitForm}
                            error={authenticate.error}
                            isAuth={authenticate.ok}
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
