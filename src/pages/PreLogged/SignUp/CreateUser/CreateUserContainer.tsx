
import { useNavigate } from 'react-router-dom';
import { MainContent } from './Presentation/MainContent';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import styles from './styles.module.css';
import imgBeachTenis from 'assets/player-beachTenis.svg';


export function CreateUserContainer() {

    const navigate = useNavigate();

    function handleSubmitForm(data: any) {
        navigate(Routes.createProfile, data);
    }


    return (
        <PreLoggedin.Layout
            header={
                <div className={styles.containerTitle}>
                    <div className={styles.msgWelcome}>
                        <p>Oi, <br />Bem Vindo</p>
                        <img src={imgBeachTenis} alt="" />
                    </div>
                </div>
            }
            main={
                <MainContent
                    submit={handleSubmitForm}
                />
            }
            footer={
                <LinkOtherPage text='Already a Member?' textLink='Log in' endPoint={Routes.login} />
            }
        />

    );
}