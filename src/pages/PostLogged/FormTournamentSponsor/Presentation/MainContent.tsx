/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import styles from '../styles.module.css';

import { Button } from '@/components/Button/Button';
import { PostLogged } from "@/components/PostLogged";
import { Validations } from "@/helper/Validations";


interface MainContentProps {
    submit: any;
}


export function MainContent({submit}: MainContentProps) {


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formTournamentSponsor)
    });

    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PostLogged.Input
                    label='Nome'
                    name='name'
                    type='text'
                    placeholder='Nome'
                    register={register}
                    msgError={errors.name?.message}
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