
import styles from './styles.module.css';
import { useState } from 'react';
import imgCreateProfile from 'assets/create_profile_title.svg';
import imgBeachTenis from 'assets/player-beachTenis.svg';
import { FieldsCreateUserAccount, FieldsCreateUserAccountPart1, FieldsCreateUserAccountPart2, UserAccount, } from 'models/UserAccount';
import { Navigate } from 'react-router-dom';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';

import { FormCreateAccountPartTwo } from 'components/PreLoggedin/FormCreateAccountPartTwo/FormCreateAccountPartTwo';
import { LinkOtherPage } from 'components/PreLoggedin/LinkOtherPage/LinkOtherPage';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { FormCreateAccountPartOne } from 'components/PreLoggedin/FormCreateAccountPartOne/FormCreateAccountPartOne';

export function SignUp() {

    const { selector } = useSelectorMethodFetch();
    const { fetch, isLoading, ok } = selector('userAccount', 'signup');

    const [flag, setFlag] = useState(true);
    const [state, setState] = useState<FieldsCreateUserAccount>({} as FieldsCreateUserAccount);


    function handleSubmitFormPart1(data: FieldsCreateUserAccountPart1) {
        setFlag(!flag);
        setState({ ...state, ...data });
    }

    function handleSubmitFormPart2(data: FieldsCreateUserAccountPart2) {
        setFlag(!flag);
        setState({ ...state, ...data });
        console.log(UserAccount.formatToSendCreate({ ...state, ...data }));
        fetch(UserAccount.formatToSendCreate({ ...state, ...data }));
    }


    return (
        <>
            {ok &&
                <Navigate to={Routes.login} />
            }

            {!ok &&
                <PreLoggedin.Layout
                    header={
                        flag
                            ?
                            <div className={styles.containerTitle}>
                                <div className={styles.msgWelcome}>
                                    <p>Oi, <br />Bem Vindo</p>
                                    <img src={imgBeachTenis} alt="" />
                                </div>
                            </div>
                            :
                            <div className={styles.containerTitle}>
                                <p className={styles.title}>
                                    Perfil
                                    <img src={imgCreateProfile} alt="" />
                                </p>
                            </div>
                    }
                    main={
                        flag
                            ? <FormCreateAccountPartOne submit={handleSubmitFormPart1} />
                            : <FormCreateAccountPartTwo submit={handleSubmitFormPart2} />
                    }
                    footer={
                        flag
                        && <LinkOtherPage text='Já é um membro?' textLink='Conecte-se' endPoint={Routes.login} />
                    }
                />
            }

        </>
    );

}
