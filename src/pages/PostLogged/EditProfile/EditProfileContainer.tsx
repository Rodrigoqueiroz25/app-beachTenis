/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { IUserAccount } from "interfaces/IUserAccount";
import { FormProfile } from './Presentation/FormProfile';
import useCities from 'hooks/useCities';
import useAccount from 'hooks/useAccount';


export function EditProfileContainer() {

    const { getAccount, updateAccount } = useAccount();
    const getCities = useCities();

    const [profile, setProfile] = useState<IUserAccount>({} as IUserAccount);

    const navigate = useNavigate();

    
    useEffect(() => {
        getAccount.get();
    }, [getAccount.error]);

    useEffect(() => {
        if (getAccount.account) {
            setProfile(getAccount.account);
        }
    }, [getAccount.account]);


    function saveDataform(data: any) {
        updateAccount.update({
            email: data.email,
            name: data.name,
            phoneNumber: data.phone,
            gender: data.gender,
            cityId: data.city,
            dateBirthday: data.dateBirthday.split('-').reverse().join('/')
        }, profile.id!);
        navigate(Routes.home);
    }


    return (
        <>
            {updateAccount.isLoading &&
                <p>isLoading</p>
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    </>
                }
                main={
                    <FormProfile
                        submit={saveDataform} 
                        cities={getCities.cities}
                        defaultValues={profile}
                    />
                }
            />
        </>
    );
}