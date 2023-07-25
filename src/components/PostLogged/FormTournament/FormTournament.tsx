/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css';
import *  as yup from "yup";
import { PostLogged } from 'components/PostLogged';
import { FieldError, FieldErrors, useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { ICity } from 'interfaces/ICity';
import { ISport } from 'interfaces/ISport';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validations } from 'helper/Validations';
import { IFormTournament } from 'interfaces/ITournament';
import { useEffect, useState } from 'react';


interface FormTournamentProps {
    submit: (data: any) => void;
    cities: ICity[];
    sports: ISport[];
    schema: yup.ObjectSchema<any>;
    defaultValues?: IFormTournament;
    fieldsInactives?: string[];

}

interface FieldDatesFormTournament {
    dtStartRegistration: string,
    dtFinalRegistration: string,
    dtStartTournament: string,
    dtFinalTournament: string
}


export function FormTournament({submit, sports, cities, schema, defaultValues, fieldsInactives}: FormTournamentProps) {
    
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const [attempToSubmit, setAttempToSubmit] = useState(false);
    const [permissionToSubmit, setPermissionToSubmit] = useState(false);
   
    const [errorValidate, setErrorValidate] = useState<FieldErrors<FieldDatesFormTournament>>({
        dtStartRegistration: {} as FieldError,
        dtFinalRegistration: {} as FieldError,
        dtStartTournament: {} as FieldError,
        dtFinalTournament: {} as FieldError
    });

    useEffect(() =>{
        if(defaultValues){
            setValue("description", defaultValues.description);
            setValue("organization", defaultValues.organization);
            setValue("sportId", defaultValues.sportId);
            setValue("cityId", defaultValues.cityId);
            setValue("dtStartRegistration", defaultValues.dtStartRegistration);
            setValue("dtFinalRegistration", defaultValues.dtFinalRegistration);
            setValue("dtStartTournament", defaultValues.dtStartTournament);
            setValue("dtFinalTournament", defaultValues.dtFinalTournament);
            setValue("otherInformation", defaultValues.otherInformation);
        }
    }, [defaultValues]);


    useEffect(() => {
        if(attempToSubmit){
            validateFieldDates({
                dtStartRegistration: watch("dtStartRegistration"),
                dtFinalRegistration: watch("dtFinalRegistration"),
                dtStartTournament: watch("dtStartTournament"),
                dtFinalTournament: watch("dtFinalTournament")
            })
        }
    },  [watch("dtStartRegistration") , watch("dtFinalRegistration"), watch("dtStartTournament"), watch("dtFinalTournament")]);

    useEffect(() =>{
        if(permissionToSubmit){
            submit({
                description: watch("description"),
                organization: watch("organization"),
                cityId: watch("cityId"),
                sportId: watch("sportId"),
                dtStartRegistration: watch("dtStartRegistration"),
                dtFinalRegistration: watch("dtFinalRegistration"),
                dtStartTournament: watch("dtStartTournament"),
                dtFinalTournament: watch("dtFinalTournament"),
                otherInformation: watch("otherInformation")
            } as IFormTournament);
        }
    },[permissionToSubmit]);


    function validateFieldDates(obj: any){
        try {
            Validations.fieldsDateFormTournament.validateSync(obj, {abortEarly: false});
            setErrorValidate({});
        } catch (error) {
            let c = error as yup.ValidationError;
            let t = {
                dtStartRegistration: c.inner.find(err => err.path === "dtStartRegistration") as FieldError,
                dtFinalRegistration: c.inner.find(err => err.path === "dtFinalRegistration") as FieldError,
                dtStartTournament: c.inner.find(err => err.path === "dtStartTournament") as FieldError,
                dtFinalTournament: c.inner.find(err => err.path === "dtFinalTournament") as FieldError
            }
            setPermissionToSubmit(false);
            setErrorValidate({...t});
        }
    }


    function handleSubmitForm(data: any){
        setAttempToSubmit(true);
        setPermissionToSubmit(true);
        validateFieldDates({
            dtStartRegistration: data.dtStartRegistration,
            dtFinalRegistration: data.dtFinalRegistration,
            dtStartTournament: data.dtStartTournament,
            dtFinalTournament: data.dtFinalTournament
        });
    }


    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(handleSubmitForm)}>
                <PostLogged.Input
                    type='text'
                    placeholder='Descrição'
                    msgError={errors.description?.message as string}
                    {...register("description")}
                />

                <PostLogged.Input
                    type='text'
                    placeholder='Organização'
                    msgError={errors.organization?.message as string}
                    {...register("organization")}
                />

                <PostLogged.Combobox
                    placeholder='Esporte'
                    msgError={errors.sportId?.message as string}
                    options={sports?.map(s => s.description)}
                    idOptions={sports?.map(s => s.id)}
                    isEmpty={watch('sportId') ? false : true}
                    {...register('sportId')}

                />

                <PostLogged.Combobox
                    placeholder='Cidade'
                    msgError={errors.cityId?.message as string}
                    options={cities?.map(c => c.name)}
                    idOptions={cities?.map(s => s.id)}
                    isEmpty={watch('cityId') ? false : true}
                    {...register('cityId')}
                />

                <div className={styles.paragraph}>
                    <p >Período de Inscrições</p>
                    <hr />
                </div>

                <div className={styles.inputDates}>
                    <div className={styles.input}>
                        <PostLogged.Input
                            placeholder='Data início'
                            type='date'
                            msgError={errorValidate.dtStartRegistration?.message || errors.dtStartRegistration?.message as string}
                            disabled={fieldsInactives?.includes('dtStartRegistration')}
                            {...register('dtStartRegistration')}
                        />
                    </div>
                    <div className={styles.input}>
                        <PostLogged.Input
                            placeholder='Data Final'
                            type='date'
                            msgError={errorValidate.dtFinalRegistration?.message || errors.dtFinalRegistration?.message as string}
                            disabled={fieldsInactives?.includes('dtFinalRegistration')}
                            {...register('dtFinalRegistration')}
                        />
                    </div>
                </div>

                <div className={styles.paragraph}>
                    <p >Período do Torneio</p>
                    <hr />
                </div>

                <div className={styles.inputDates}>
                    <div className={styles.input}>
                        <PostLogged.Input
                            placeholder='Data inicial'
                            type='date'
                            msgError={errorValidate.dtStartTournament?.message || errors.dtStartTournament?.message as string}
                            disabled={fieldsInactives?.includes('dtStartTournament')}
                            {...register('dtStartTournament')}
                        />
                    </div>
                    <div className={styles.input}>
                        <PostLogged.Input
                            placeholder='Data Final'
                            type='date'
                            msgError={errorValidate.dtFinalTournament?.message || errors.dtFinalTournament?.message as string}
                            disabled={fieldsInactives?.includes('dtFinalTournament')}
                            {...register('dtFinalTournament')}
                        />
                    </div>
                </div>

                <textarea className={styles.info}
                    placeholder='Outras informações'
                    {...register("otherInformation")}
                ></textarea>

                <Button>{defaultValues ? "Alterar" : "Adicionar"}</Button>
            </form>
        </>
    );
}