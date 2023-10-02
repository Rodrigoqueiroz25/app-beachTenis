/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";

import { City } from 'models/City';
import { FieldsUpdateUserAccount, UserAccount } from 'models/UserAccount';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';
import { FormEditProfile } from 'components/PostLogged/FormEditProfile/FormEditProfile';


export function EditProfile() {

    const { StateFetchHandle, Body, Header, HeaderDiv, Main } = PostLogged.Layout();
    const navigate = useNavigate();
    const { selector } = useSelectorMethodFetch();
    const cities = selector('city', 'getAll');
    const selfAccount = selector('userAccount', 'getYourSelf');
    const updateAccount = selector('userAccount', 'updateYourSelf');

    useEffect(() => {
        selfAccount.fetch();
        cities.fetch();
    }, []);

    function saveDataform(data: FieldsUpdateUserAccount) {
        updateAccount.fetch(UserAccount.formatToSendUpdate(data), selfAccount.data.id);
    }


    return (
        <StateFetchHandle
            isLoading={selfAccount.isLoading && cities.isLoading}
            dataGetted={selfAccount.ok && cities.ok}
            shouldRedirect={{
                redirect: updateAccount.ok,
                to: Routes.home
            }}
        >
            <Body>
                <Header>
                    <HeaderDiv>
                        <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                    </HeaderDiv>
                </Header>
                <Main>
                    <FormEditProfile
                        submit={saveDataform}
                        cities={City.toOptionCombobox(cities.data)}
                        defaultValues={UserAccount.toFieldsFormUpdateFormat(selfAccount.data)}
                    />
                </Main>
            </Body>
        </StateFetchHandle>
    );
}