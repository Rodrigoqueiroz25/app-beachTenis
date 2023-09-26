/* eslint-disable react-hooks/exhaustive-deps */


import { useNavigate } from 'react-router-dom';
import { Routes } from "enums/routes.enum";
import { PostLogged } from "components/PostLogged";
import { FormEditProfile } from './Presentation/FormEditProfile';
import { City } from 'models/City';
import { FieldsUpdateUserAccount, UserAccount } from 'models/UserAccount';
import { useSelectorMethodFetch } from 'hooks/fetchApi/useSelectorMethodFetch';
import { useEffect } from 'react';


export function EditProfileContainer() {

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
        navigate(Routes.home);
    }


    return (
        <>
            {selfAccount.isLoading && cities.isLoading &&
                <p>isLoading</p>
            }

            {selfAccount.ok && cities.ok &&
                <PostLogged.LayoutPage.Layout
                    header={
                        <PostLogged.LayoutPage.Header>
                            <PostLogged.ButtonBack onClick={() => navigate(Routes.home)} />
                        </PostLogged.LayoutPage.Header>
                    }
                    main={
                        <FormEditProfile
                            submit={saveDataform}
                            cities={City.toOptionCombobox(cities.data)}
                            defaultValues={UserAccount.toFieldsFormUpdateFormat(selfAccount.data)}
                        />
                    }
                />

            }
        </>

    );
}