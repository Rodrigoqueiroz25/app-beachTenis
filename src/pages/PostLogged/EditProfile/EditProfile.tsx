/* eslint-disable react-hooks/exhaustive-deps */

import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import imgPhotoCircle from '@/assets/photo_create_profile.svg';
import styles from './EditProfile.module.css';
import { Button } from '@/components/Button/Button';

import useFetchData from '@/hooks/useFetchData';
import useCookiesSession from '@/hooks/useCookiesSession';

import { ICity } from '@/interfaces/ICity';
import { Routes } from "@/enums/routes.enum";
import { PostLogged } from "@/components/PostLogged";
import { IUserAccount } from "@/interfaces/IUserAccount";
import { Requests } from "@/helper/Requests";
import { Validations } from "@/helper/Validations";


export function EditProfile() {

    const userAccountFetch = useFetchData<IUserAccount>();
    const userAccountUpdateFetch = useFetchData<IUserAccount>();
    const citiesFetch = useFetchData<ICity[]>();

    const { getCookieToken } = useCookiesSession();

    const [cities, setCities] = useState<ICity[]>([]);
    const [gender, setGender] = useState("");
    const [idUser, setIdUser] = useState("");
    const [errorss, setErrors] = useState("");

    const navigate = useNavigate();

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({
        resolver: yupResolver(Validations.formEditProfile)
    });


    useEffect(() => {
        userAccountFetch.fetchData(Requests.getUserByToken(getCookieToken()));
    }, [userAccountFetch.error]);

    useEffect(() => {
        citiesFetch.fetchData(Requests.getCities(getCookieToken()));
    }, [citiesFetch.error]);

    useEffect(() => {
        if (citiesFetch.data) {
            setCities(citiesFetch.data);
        }
    }, [citiesFetch.data]);


    useEffect(() => {
        if (userAccountFetch.data) {
            setValue('name', userAccountFetch.data.name);
            setValue('email', userAccountFetch.data.email);
            setValue('phone', userAccountFetch.data.phoneNumber);
            setValue('city', userAccountFetch.data.cityId);
            setValue('dateBirthday', userAccountFetch.data.dateBirthday.split('/').reverse().join('-'));
            setGender(userAccountFetch.data.gender.toUpperCase());
            setIdUser(userAccountFetch.data.id);
        }
    }, [userAccountFetch.data, cities]);

    useEffect(() => {
        valida(watch('dateBirthday'));
    }, [watch('dateBirthday')]);


    function saveDataform(data: any) {
        try {
            Validations.dateOfBirthFieldForm.validateSync({ birthday: data.dateBirthday });
            setErrors("");
            userAccountUpdateFetch.fetchData(Requests.updateUser({
                email: data.email,
                name: data.name,
                phoneNumber: data.phone,
                gender: gender,
                cityId: data.city,
                dateBirthday: data.dateBirthday.split('-').reverse().join('/')
            }, parseInt(idUser), getCookieToken()));
            reset();
            navigate(Routes.home);
        } catch (error) {
            let c = error as yup.ValidationError;
            setErrors(c.message);

        }
    }


    function valida(str: string) {
        try {
            Validations.dateOfBirthFieldForm.validateSync({ birthday: str });
            setErrors("");
        } catch (error) {
            let c = error as yup.ValidationError;
            setErrors(c.message);
        }
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
                    <>
                        <form className={styles.form} onSubmit={handleSubmit(saveDataform)}>
                            <div className={styles.photo}>
                                <img src={imgPhotoCircle} alt="" />
                            </div>
                            <PostLogged.Input
                                label='Nome'
                                name='name'
                                type='text'
                                placeholder='Nome'
                                register={register}
                                msgError={errors['name']?.message}
                            />

                            <PostLogged.Input
                                label='E-mail'
                                name='email'
                                type='text'
                                placeholder='E-mail'
                                register={register}
                                msgError={errors['email']?.message}
                            />

                            <PostLogged.Input
                                label="Telefone"
                                type="text"
                                placeholder="Telefone"
                                name="phone"
                                register={register}
                                msgError={errors['phone']?.message}
                            />

                            <PostLogged.Combobox
                                label='Cidade'
                                name='city'
                                register={register}
                                errors={errors}
                                data={cities.map(c => c.name)}
                                ids={cities.map(c => c.id)}
                                watch={watch('city')}
                            />

                            <PostLogged.Input
                                label="Data de Nascimento"
                                type="date"
                                placeholder="Data de Nascimento"
                                name="dateBirthday"
                                register={register}
                                msgError={errors['dateBirthday']?.message ? errors['dateBirthday']?.message : errorss}
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
                }
            />
        </>
    );
}