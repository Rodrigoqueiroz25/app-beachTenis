/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { IUserAccount } from "interfaces/IUserAccount";
import { FormEditProfile } from './Presentation/FormEditProfile';
import useFetchAccount from 'hooks/useFetchAccount';
import useGetCities from 'hooks/useGetCities';


export function EditProfileContainer() {

    const { getAccount, updateAccount } = useFetchAccount();
    const getCities = useGetCities();

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
        updateAccount.update(data, profile.id!);
        navigate(Routes.home);
    }


    return (
        <>
            {updateAccount.isLoading &&
                <p>isLoading</p>
            }

            <PostLogged.LayoutPage.Layout
                header={
                    <PostLogged.LayoutPage.Header>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    </PostLogged.LayoutPage.Header>
                }
                main={
                    <FormEditProfile
                        submit={saveDataform} 
                        cities={getCities.cities?.map((city) => (
                            {name: city.name, value: city.id}
                        ))}
                        defaultValues={profile}
                    />
                }
            />
        </>
    );
}