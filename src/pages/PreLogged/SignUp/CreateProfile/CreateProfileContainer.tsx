/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MainContent } from './Presentation/MainContent';
import imgCreateProfile from '@/assets/create_profile_title.svg';
import { Routes } from '@/enums/routes.enum';
import styles from './styles.module.css';
import { PreLoggedin } from '@/components/PreLoggedin';
import { IDataSignUp } from '@/interfaces/IDataSignUp';
import { convertData } from '@/helper/convertData';
import useAccount from '@/hooks/useAccount';

export function CreateProfileContainer() {

    const location = useLocation();
    const navigate = useNavigate();
    const { register } = useAccount();

    useEffect(() => {
        if (!location.state?.phoneNumber) {
            navigate(Routes.signup)
        }
    },[location.state?.phoneNumber]);
    

    async function handleSubmitForm(data: any) {
        let dataSignup: IDataSignUp = {
            email: location.state.email,
            password: location.state.password,
            name: `${data.firstName} ${data.lastName}`,
            phoneNumber: location.state.phoneNumber,
            gender: data.gender,
            cityId: '4709',
            dateBirthday: convertData(data.dateBirthday)
        }
        register.signup(dataSignup);
    }


    return (
        <>
            {register.isLoading &&
                <p>isLoading</p>
            }

            {register.ok
                ? <Navigate to={Routes.login} />
                :
                <PreLoggedin.Layout
                    header={
                        <div className={styles.containerTitle}>
                            <p className={styles.title}>
                                Perfil
                                <img src={imgCreateProfile} alt="" />
                            </p>
                        </div>
                    }
                    main={
                       <MainContent
                            submit={handleSubmitForm}
                       />
                    }

                />
            }

        </>
    );
}