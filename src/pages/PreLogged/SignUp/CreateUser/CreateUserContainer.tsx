
import { useNavigate } from 'react-router-dom';
import { FormCreateUser } from './Presentation/FormCreateUser';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import styles from './styles.module.css';
import imgBeachTenis from 'assets/player-beachTenis.svg';


export function CreateUserContainer() {

    const navigate = useNavigate();

    function handleSubmitForm(data: any) {
        console.log(data);
        navigate(Routes.createProfile, {state: {user: data}});
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
                <FormCreateUser
                    submit={handleSubmitForm}
                />
            }
            footer={
                <LinkOtherPage text='Já é um membro?' textLink='Conecte-se' endPoint={Routes.login} />
            }
        />

    );
}