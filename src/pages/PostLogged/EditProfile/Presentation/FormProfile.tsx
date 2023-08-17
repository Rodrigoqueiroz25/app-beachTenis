/* eslint-disable react-hooks/exhaustive-deps */

import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import styles from '../styles.module.css'
import { Button } from 'components/Button/Button';
import { ICity } from 'interfaces/ICity';
import { PostLogged } from "components/PostLogged";
import { IUserAccount } from "interfaces/IUserAccount";
import { cidade, city, dataNascimento, dateBirthday, e_mail, email, female, feminino, genero, male, masculino, nameUser, nome, phoneNumber, salvar, telefone } from "constants/wordsPhrases";
import { Validations } from 'helper/Validations';
import { brazilDateString } from 'helper/convertData';


interface FormProfileProps {
    submit: (data: any) => void;
    cities: ICity[];
    defaultValues?: IUserAccount;
}


export function FormProfile({ submit, cities, defaultValues }: FormProfileProps) {

    const [gender, setGender] = useState("");

    const validations = Validations.formEditProfile;

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm({

    });


    useEffect(() => {
        if (defaultValues) {
            setValue(nameUser, defaultValues?.[nameUser]);
            setValue(email, defaultValues?.[email]);
            setValue(phoneNumber, defaultValues?.[phoneNumber]);
            setValue(city, defaultValues?.[city]);
            setValue(dateBirthday, defaultValues?.[dateBirthday]?.split('/').reverse().join('-'));
            setGender(defaultValues?.[gender]?.toUpperCase());
        }
    }, [defaultValues]);


    function submitForm(data: any){
        data.gender = gender;
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
                    options={cities?.map(c => c.name)}
                    idOptions={cities?.map(c => c.id)}
                    isEmpty={watch(city) ? false : true}
                    {...register(city, validations[city])}
                />

                <PostLogged.Input
                    type="date"
                    placeholder={dataNascimento}
                    msgError={errors[dateBirthday]?.message?.toString()}
                    {...register(dateBirthday, validations[dateBirthday])}
                />

                <div className={styles.gender}>
                    <p>{genero}</p>

                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id={male}
                            value='M'
                            checked={gender === 'M'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}

                        />
                        <label htmlFor={male}>{masculino}</label>
                    </div>
                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id={female}
                            value='F'
                            checked={gender === 'F'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                        />
                        <label htmlFor={female}>{feminino}</label>
                    </div>

                </div>

                <Button>{salvar}</Button>
            </form>
        </>

    );
}