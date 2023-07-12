/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from '@/hooks/useCookiesSession';

import { ICity } from '@/interfaces/ICity';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { IUserAccount } from "@/interfaces/IUserAccount";
import { Requests } from "@/helper/Requests";
import { MainContent } from './Presentation/MainContent';


export function EditProfileContainer() {

    const userAccountFetch = useFetchData<IUserAccount>();
    const citiesFetch = useFetchData<ICity[]>();

    const { getCookieToken } = useCookiesSession();

    const [cities, setCities] = useState<ICity[]>([]);
    const [profile, setProfile] = useState<IUserAccount>({} as IUserAccount);

    const navigate = useNavigate();

    
    useEffect(() => {
        userAccountFetch.fetchData(Requests.getUserByToken(getCookieToken()));
    }, [userAccountFetch.error]);

    useEffect(() => {
        if (userAccountFetch.data) {
            setProfile(userAccountFetch.data);
        }
    }, [userAccountFetch.data]);

    useEffect(() => {
        citiesFetch.fetchData(Requests.getCities(getCookieToken()));
    }, [citiesFetch.error]);

    useEffect(() => {
        if (citiesFetch.data) {
            setCities(citiesFetch.data);
        }
    }, [citiesFetch.data]);


    function saveDataform(data: any) {
        userAccountFetch.fetchData(Requests.updateUser({
            email: data.email,
            name: data.name,
            phoneNumber: data.phone,
            gender: data.gender,
            cityId: data.city,
            dateBirthday: data.dateBirthday.split('-').reverse().join('/')
        }, profile.id, getCookieToken()));
        navigate(Routes.home);
    }


    return (
        <>
            {userAccountFetch.isLoading &&
                <p>isLoading</p>
            }

            <PostLogged.Layout
                header={
                    <>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    </>
                }
                main={
                    <MainContent
                        submit={saveDataform} 
                        cities={cities}
                        profile={profile}
                    />
                }
            />
        </>
    );
}