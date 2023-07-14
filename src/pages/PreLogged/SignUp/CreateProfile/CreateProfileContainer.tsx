/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { MainContent } from './Presentation/MainContent';
import imgCreateProfile from '@/assets/create_profile_title.svg';
import useSignup from '@/hooks/useSignup';
import { Routes } from '@/enums/routes.enum';
import styles from './styles.module.css';
import { PreLoggedin } from '@/components/PreLoggedin';
import { IDataSignUp } from '@/interfaces/IDataSignUp';
import { convertData } from '@/helper/convertData';

export function CreateProfileContainer() {

    const location = useLocation();
    const navigate = useNavigate();

    const { signup, ok, isLoading, error } = useSignup();
   
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
        signup(dataSignup);
    }


    return (
        <>
            {isLoading &&
                <p>isLoading</p>
            }

            {ok
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