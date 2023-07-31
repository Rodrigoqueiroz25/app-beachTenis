/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import imgPhotoCircle from 'assets/photo_create_profile.svg';
import styles from '../styles.module.css'
import { Button } from 'components/Button/Button';

import { ICity } from 'interfaces/ICity';
import { PostLogged } from "components/PostLogged";
import { Validations } from "helper/Validations";
import { IUserAccount } from "interfaces/IUserAccount";


interface FormProfileProps {
    submit: (data: any) => void;
    cities: ICity[];
    defaultValues?: IUserAccount;
}


export function FormProfile({ submit, cities, defaultValues }: FormProfileProps) {

    const [gender, setGender] = useState("");
    const [errorData, setErrorData] = useState("");


    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(Validations.formEditProfile)
    });

    function validaDateBirthDay(str: string, opt?: { func?: any, data?: any}) {
        try {
            Validations.dateOfBirthFieldForm.validateSync({ birthday: str });
            setErrorData("");
            if(opt){
                opt.func(opt.data);
            }
        } catch (error) {
            let c = error as yup.ValidationError;
            setErrorData(c.message);
        }
    }


    useEffect(() => {
        if (defaultValues) {
            setValue('name', defaultValues.name);
            setValue('email', defaultValues.email);
            setValue('phone', defaultValues.phoneNumber);
            setValue('city', defaultValues.cityId);
            setValue('dateBirthday', defaultValues.dateBirthday?.split('/').reverse().join('-'));
            setGender(defaultValues.gender?.toUpperCase());
        }
    }, [defaultValues]);

    useEffect(() => {
        validaDateBirthDay(watch('dateBirthday'));
    }, [watch('dateBirthday')]);



    function submitForm(data: any){
        data.gender = gender;
        validaDateBirthDay(data.dateBirthday, {func: submit, data: data});
    }

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.photo}>
                    <img src={imgPhotoCircle} alt="" />
                </div>
                <PostLogged.Input
                    type='text'
                    placeholder='Nome'
                    msgError={errors.name?.message}
                    {...register('name')}
                />

                <PostLogged.Input
                    type='text'
                    placeholder='E-mail'
                    msgError={errors.email?.message}
                    {...register('email')}
                />

                <PostLogged.Input
                    type="text"
                    placeholder="Telefone"
                    msgError={errors.phone?.message}
                    {...register('phone')}
                />

                <PostLogged.Combobox
                    placeholder='Cidade'
                    msgError={errors.city?.message}
                    options={cities?.map(c => c.name)}
                    idOptions={cities?.map(c => c.id)}
                    isEmpty={watch('city') ? false : true}
                    {...register('city')}
                />

                <PostLogged.Input
                    type="date"
                    placeholder="Data de Nascimento"
                    msgError={errors.dateBirthday?.message ? errors.dateBirthday?.message : errorData}
                    {...register('dateBirthday')}
                />

                <div className={styles.gender}>
                    <p>Gender</p>

                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id='male'
                            value='M'
                            checked={gender === 'M'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}

                        />
                        <label htmlFor="male">Male</label>
                    </div>
                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id='female'
                            value='F'
                            checked={gender === 'F'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                        />
                        <label htmlFor="female">Female</label>
                    </div>

                </div>

                <Button>Salvar</Button>
            </form>
        </>

    );
}