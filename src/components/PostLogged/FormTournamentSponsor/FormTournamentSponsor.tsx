/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { Button } from 'components/Button/Button';
import { PostLogged } from "components/PostLogged";
import { IFormTournamentSponsor } from "interfaces/ITournamentSponsor";
import { useEffect } from "react";
import { Validations } from "helper/Validations";
import { alterar, nameUser, nome, otherInformation, outrasInformacoes, salvar } from "constants/wordsPhrases";


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
            setValue(nameUser, defaultValues[nameUser]);
            setValue(otherInformation, defaultValues[otherInformation]);
        }
    }, [defaultValues]);

    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PostLogged.Input
                    type='text'
                    placeholder={nome}
                    msgError={errors[nameUser]?.message as string}
                    {...register(nameUser)}
                />

                <PostLogged.TextArea 
                    placeholder={outrasInformacoes}
                    msgError={errors[otherInformation]?.message as string}
                    {...register(otherInformation)}
                />

                <div className={styles.button}>
                    <Button>{defaultValues ? alterar : salvar}</Button>
                </div>

            </form>
        </>

    );
}