/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css';
import *  as yup from "yup";
import { PostLogged } from '@/components/PostLogged';
import { FieldError, FieldErrors, useForm } from 'react-hook-form';
import { Button } from '@/components/Button/Button';
import { ICity } from '@/interfaces/ICity';
import { ISport } from '@/interfaces/ISport';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validations } from '@/helper/Validations';
import { IFormTournament } from '@/interfaces/ITournament';
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
                    label='Descrição'
                    name='description'
                    type='text'
                    placeholder='Descrição'
                    register={register}
                    msgError={errors.description?.message as string}
                />

                <PostLogged.Input
                    label='Organização'
                    name='organization'
                    type='text'
                    placeholder='Organização'
                    register={register}
                    msgError={errors.organization?.message as string}
                    
                />

                <PostLogged.Combobox
                    label='Esporte'
                    name='sportId'
                    register={register}
                    msgError={errors.sportId?.message as string}
                    options={sports?.map(s => s.description)}
                    idOptions={sports?.map(s => s.id)}
                    isEmpty={watch('sportId') ? false : true}
                />

                <PostLogged.Combobox
                    label='Cidade'
                    name='cityId'
                    register={register}
                    msgError={errors.cityId?.message as string}
                    options={cities?.map(c => c.name)}
                    idOptions={cities?.map(s => s.id)}
                    isEmpty={watch('cityId') ? false : true}
                />

                <div className={styles.paragraph}>
                    <p >Período de Inscrições</p>
                    <hr />
                </div>

                <div className={styles.inputDates}>
                    <div className={styles.input}>
                        <PostLogged.Input
                            label='Data início'
                            name='dtStartRegistration'
                            placeholder='Data início'
                            type='date'
                            register={register}
                            msgError={errorValidate.dtStartRegistration?.message || errors.dtStartRegistration?.message as string}
                            disabled={fieldsInactives?.includes('dtStartRegistration')}
                        />
                    </div>
                    <div className={styles.input}>
                        <PostLogged.Input
                            label='Data Final'
                            name='dtFinalRegistration'
                            placeholder='Data Final'
                            type='date'
                            register={register}
                            msgError={errorValidate.dtFinalRegistration?.message || errors.dtFinalRegistration?.message as string}
                            disabled={fieldsInactives?.includes('dtFinalRegistration')}
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
                            label='Data inicial'
                            name='dtStartTournament'
                            placeholder='Data inicial'
                            type='date'
                            register={register}
                            msgError={errorValidate.dtStartTournament?.message || errors.dtStartTournament?.message as string}
                            disabled={fieldsInactives?.includes('dtStartTournament')}
                        />
                    </div>
                    <div className={styles.input}>
                        <PostLogged.Input
                            label='Data Final'
                            name='dtFinalTournament'
                            placeholder='Data Final'
                            type='date'
                            register={register}
                            msgError={errorValidate.dtFinalTournament?.message || errors.dtFinalTournament?.message as string}
                            disabled={fieldsInactives?.includes('dtFinalTournament')}
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