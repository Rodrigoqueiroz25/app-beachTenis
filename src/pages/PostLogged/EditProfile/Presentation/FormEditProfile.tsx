/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import styles from '../styles.module.css'
import { Button } from 'components/Button/Button';
import { PostLogged } from "components/PostLogged";
import { cidade, dataNascimento, e_mail, nome, salvar, telefone } from "constants/wordsPhrases";
import { Validations } from 'helper/Validations';
import { americanDateString, brazilDateString } from 'helper/convertData';
import { RadioGroupGender } from 'components/RadioGroupGender/RadioGroupGender';
import { IOptionCombobox } from 'interfaces/IOptionCombobox';
import { FieldsUpdateUserAccount } from 'models/UserAccount';


interface FormEditProfileProps {
    submit: (data: FieldsUpdateUserAccount) => void;
    cities: IOptionCombobox[];
    defaultValues: FieldsUpdateUserAccount;
}


export function FormEditProfile({ submit, cities, defaultValues }: FormEditProfileProps) {

    const { register, handleSubmit, formState: { errors }, setValue} = useForm<FieldsUpdateUserAccount>();
    const validations = Validations.formEditProfile;
    

    useEffect(() => {
        if (defaultValues) {
            setValue('name', defaultValues.name);
            setValue('email', defaultValues.email);
            setValue('phoneNumber', defaultValues.phoneNumber);
            setValue('cityId', defaultValues.cityId);
            setValue('dateBirthday', americanDateString(defaultValues.dateBirthday));
            setValue('gender', defaultValues.gender);
        }
    }, [defaultValues]);


    function submitForm(data: FieldsUpdateUserAccount){
        data.dateBirthday = brazilDateString(data.dateBirthday);
        submit(data);
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.photo}>
                    <img src={imgPhotoCircle} alt="" />
                </div>
                <PostLogged.Input
                    type='text'
                    placeholder={nome}
                    msgError={errors['name']?.message?.toString()}
                    {...register('name', validations['name'])}
                />

                <PostLogged.Input
                    type='text'
                    placeholder={e_mail}
                    msgError={errors['email']?.message?.toString()}
                    {...register('email', validations['email'])}
                />

                <PostLogged.Input
                    type="text"
                    placeholder={telefone}
                    msgError={errors['phoneNumber']?.message?.toString()}
                    {...register('phoneNumber', validations['phoneNumber'])}
                />

                <PostLogged.Combobox
                    placeholder={cidade}
                    msgError={errors['cityId']?.message?.toString()}
                    options={cities}
                    {...register('cityId', validations.cityId)}
                />

                <PostLogged.Input
                    type="date"
                    placeholder={dataNascimento}
                    msgError={errors.dateBirthday?.message?.toString()}
                    {...register('dateBirthday', validations.dateBirthday)}
                />

                <RadioGroupGender
                    {...register('gender', validations.gender)}
                    msgError={errors.gender?.message?.toString()}
                />
                
                <Button>{salvar}</Button>
            </form>
        </>

    );
}