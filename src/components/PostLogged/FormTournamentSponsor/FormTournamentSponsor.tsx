/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";
import *  as yup from "yup";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { Button } from 'components/Button/Button';
import { PostLogged } from "components/PostLogged";
import { IFormTournamentSponsor } from "interfaces/ITournamentSponsor";
import { useEffect } from "react";
import { Validations } from "helper/Validations";


interface FormTournamentSponsorProps {
    submit: (data: any) => void;
    defaultValues?: IFormTournamentSponsor;
}


export function FormTournamentSponsor({submit, defaultValues}: FormTournamentSponsorProps) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(Validations.formTournamentSponsor)
    });

    useEffect(() => {
        if(defaultValues){
            setValue("name", defaultValues.name);
            setValue("otherInformation", defaultValues.otherInformation);
        }
    }, [defaultValues]);

    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PostLogged.Input
                    type='text'
                    placeholder='Nome'
                    msgError={errors.name?.message as string}
                    {...register('name')}
                />

                <textarea className={styles.info}
                    placeholder='Outras informações'
                    {...register("otherInformation")}
                ></textarea>

                <div className={styles.button}>
                    <Button>Salvar</Button>
                </div>

            </form>
        </>

    );
}