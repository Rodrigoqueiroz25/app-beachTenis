/* eslint-disable react-hooks/exhaustive-deps */

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import styles from './styles.module.css';
import { Button } from 'components/Button/Button';
import { PostLogged } from "components/PostLogged";
import { useEffect } from "react";
import { Validations } from "helper/Validations";
import { alterar, nome, outrasInformacoes, salvar } from "constants/wordsPhrases";
import { FieldsTournamentSponsor } from "models/TournamentSponsor";


interface Props {
    submit: (data: FieldsTournamentSponsor) => void;
    defaultValues?: FieldsTournamentSponsor;
}


export function FormTournamentSponsor({submit, defaultValues}: Props) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FieldsTournamentSponsor>({
        resolver: yupResolver(Validations.formTournamentSponsor)
    });
    

    useEffect(() => {
        if(defaultValues){
            setValue('name', defaultValues['name']);
            setValue('otherInformation', defaultValues['otherInformation']);
        }
    }, [defaultValues]);

    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PostLogged.Input
                    type='text'
                    placeholder={nome}
                    msgError={errors['name']?.message as string}
                    {...register('name')}
                />

                <PostLogged.TextArea 
                    placeholder={outrasInformacoes}
                    msgError={errors['otherInformation']?.message as string}
                    {...register('otherInformation')}
                />

                <div className={styles.button}>
                    <Button>{defaultValues ? alterar : salvar}</Button>
                </div>

            </form>
        </>

    );
}