/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import styles from '../styles.module.css'
import { Button } from 'components/Button/Button';
import { ICity } from 'interfaces/ICity';
import { PostLogged } from "components/PostLogged";
import { IUserAccount } from "interfaces/IUserAccount";
import { cidade, city, dataNascimento, dateBirthday, e_mail, email, gender, nameUser, nome, phoneNumber, salvar, telefone } from "constants/wordsPhrases";
import { Validations } from 'helper/Validations';
import { brazilDateString } from 'helper/convertData';
import { RadioGroupGender } from 'components/RadioGroupGender/RadioGroupGender';
import { IOptionCombobox } from 'interfaces/IOptionCombobox';


interface FormEditProfileProps {
    submit: (data: any) => void;
    cities: IOptionCombobox[];
    defaultValues?: IUserAccount;
}


export function FormEditProfile({ submit, cities, defaultValues }: FormEditProfileProps) {

    const validations = Validations.formEditProfile;

    const { register, handleSubmit, watch, formState: { errors }, setValue} = useForm({});


    useEffect(() => {
        if (defaultValues) {
            setValue(nameUser, defaultValues?.[nameUser]);
            setValue(email, defaultValues?.[email]);
            setValue(phoneNumber, defaultValues?.[phoneNumber]);
            setValue(city, defaultValues?.[city]);
            setValue(dateBirthday, defaultValues?.[dateBirthday]?.split('/').reverse().join('-'));
            setValue(gender, defaultValues?.[gender]);
        }
    }, [defaultValues]);


    function submitForm(data: any){
        data[dateBirthday] = brazilDateString(data[dateBirthday]);
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
                    msgError={errors[nameUser]?.message?.toString()}
                    {...register(nameUser, validations[nameUser])}
                />

                <PostLogged.Input
                    type='text'
                    placeholder={e_mail}
                    msgError={errors[email]?.message?.toString()}
                    {...register(email, validations[email])}
                />

                <PostLogged.Input
                    type="text"
                    placeholder={telefone}
                    msgError={errors[phoneNumber]?.message?.toString()}
                    {...register(phoneNumber, validations[phoneNumber])}
                />

                <PostLogged.Combobox
                    placeholder={cidade}
                    msgError={errors[city]?.message?.toString()}
                    options={cities}
                    {...register(city, validations[city])}
                />

                <PostLogged.Input
                    type="date"
                    placeholder={dataNascimento}
                    msgError={errors[dateBirthday]?.message?.toString()}
                    {...register(dateBirthday, validations[dateBirthday])}
                />

                <RadioGroupGender
                    {...register(gender, validations[gender])}
                    msgError={errors[gender]?.message?.toString()}
                />
                
                <Button>{salvar}</Button>
            </form>
        </>

    );
}