/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import imgPhotoCircle from '@/assets/photo_create_profile.svg';
import styles from '../styles.module.css'
import { Button } from '@/components/Button/Button';

import { ICity } from '@/interfaces/ICity';
import { PostLogged } from "@/components/PostLogged";
import { Validations } from "@/helper/Validations";
import { IUserAccount } from "@/interfaces/IUserAccount";


interface MainContentProps {
    submit: any;
    cities: ICity[];
    profile?: IUserAccount;
}


export function MainContent({ submit, cities, profile }: MainContentProps) {

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
        if (profile) {
            setValue('name', profile.name);
            setValue('email', profile.email);
            setValue('phone', profile.phoneNumber);
            setValue('city', profile.cityId);
            setValue('dateBirthday', profile.dateBirthday?.split('/').reverse().join('-'));
            setGender(profile.gender?.toUpperCase());
        }
    }, [profile]);

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
                    label='Nome'
                    name='name'
                    type='text'
                    placeholder='Nome'
                    register={register}
                    msgError={errors.name?.message}
                />

                <PostLogged.Input
                    label='E-mail'
                    name='email'
                    type='text'
                    placeholder='E-mail'
                    register={register}
                    msgError={errors.email?.message}
                />

                <PostLogged.Input
                    label="Telefone"
                    type="text"
                    placeholder="Telefone"
                    name="phone"
                    register={register}
                    msgError={errors.phone?.message}
                />

                <PostLogged.Combobox
                    label='Cidade'
                    name='city'
                    register={register}
                    msgError={errors.city?.message}
                    options={cities.map(c => c.name)}
                    idOptions={cities.map(c => c.id)}
                    isEmpty={watch('city') ? false : true}
                />

                <PostLogged.Input
                    label="Data de Nascimento"
                    type="date"
                    placeholder="Data de Nascimento"
                    name="dateBirthday"
                    register={register}
                    msgError={errors.dateBirthday?.message ? errors.dateBirthday?.message : errorData}
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