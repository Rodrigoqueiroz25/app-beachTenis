/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { Validations } from 'helper/Validations';
import { useEffect } from 'react';
import { adicionar, alterar, cidade, dataFinal, dataInicial, descricao, esporte, organizacao,  outrasInformacoes } from 'constants/wordsPhrases';
import { americanDateString, brazilDateString } from 'helper/convertData';
import { IOptionCombobox } from 'interfaces/IOptionCombobox';
import { FieldsTournament } from 'models/Tournament';


interface FormTournamentProps {
    submit: (data: FieldsTournament) => void;
    cities: IOptionCombobox[];
    sports: IOptionCombobox[];
    defaultValues?: FieldsTournament;
    fieldsInactives?: string[];
}


export function FormTournament({ submit, sports, cities, defaultValues, fieldsInactives }: FormTournamentProps) {

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FieldsTournament>();
    const validations = Validations.formTournament;

    useEffect(() => {
        if (defaultValues) {
            setValue('description', defaultValues['description']);
            setValue('organization', defaultValues['organization']);
            setValue('sportCode', defaultValues['sportCode']); 
            setValue('cityCode', defaultValues['cityCode']); 
            setValue('dateStartRegistration', americanDateString(defaultValues['dateStartRegistration']));
            setValue('dateFinalRegistration', americanDateString(defaultValues['dateFinalRegistration']));
            setValue('dateStartTournament', americanDateString(defaultValues['dateStartTournament']));
            setValue('dateFinalTournament', americanDateString(defaultValues['dateFinalTournament']));
            setValue('otherInformation', defaultValues['otherInformation']);
        }
    }, [defaultValues]);


    function submitForm(data: FieldsTournament) {
        data['dateStartRegistration'] = brazilDateString(watch('dateStartRegistration'));
        data['dateFinalRegistration'] = brazilDateString(watch('dateFinalRegistration'));
        data['dateStartTournament'] = brazilDateString(watch('dateStartTournament'));
        data['dateFinalTournament'] = brazilDateString(watch('dateFinalTournament'));
        submit(data);
    }


    return (
        <>
            <PostLogged.AddBanner />
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <PostLogged.Input
                    type='text'
                    placeholder={descricao}
                    msgError={errors['description']?.message?.toString()}
                    {...register('description', validations['description'])}
                />

                <PostLogged.Input
                    type='text'
                    placeholder={organizacao}
                    msgError={errors['organization']?.message?.toString()}
                    {...register('organization', validations['organization'])}
                />

                <PostLogged.Combobox
                    placeholder={esporte}
                    msgError={errors['sportCode']?.message?.toString()}
                    options={sports}
                    {...register('sportCode', validations['sportCode'])}
                />

                <PostLogged.Combobox
                    placeholder={cidade}
                    msgError={errors['cityCode']?.message?.toString()}
                    options={cities}
                    {...register('cityCode', validations['cityCode'])}
                />

                <div className={styles.paragraph}>
                    <p >Período de Inscrições</p>
                    <hr />
                </div>

                <div className={styles.inputDates}>
                    <PostLogged.Input
                        placeholder={dataInicial}
                        type='date'
                        msgError={errors['dateStartRegistration']?.message?.toString()}
                        disabled={fieldsInactives?.includes('dateStartRegistration')}
                        {...register('dateStartRegistration', validations['dateStartRegistration'])}
                    />
                    <PostLogged.Input
                        placeholder={dataFinal}
                        type='date'
                        msgError={errors['dateFinalRegistration']?.message?.toString()}
                        disabled={fieldsInactives?.includes('dateFinalRegistration')}
                        {...register('dateFinalRegistration', validations['dateFinalRegistration'](watch('dateStartRegistration')))}
                    />
                </div>

                <div className={styles.paragraph}>
                    <p >Período do Torneio</p>
                    <hr />
                </div>

                <div className={styles.inputDates}>
                    <PostLogged.Input
                        placeholder={dataInicial}
                        type='date'
                        msgError={errors['dateStartTournament']?.message?.toString()}
                        disabled={fieldsInactives?.includes('dateStartTournament')}
                        {...register('dateStartTournament', validations['dateStartTournament'](watch('dateFinalRegistration')))}
                    />
                    <PostLogged.Input
                        placeholder={dataFinal}
                        type='date'
                        msgError={errors['dateFinalTournament']?.message?.toString()}
                        disabled={fieldsInactives?.includes('dateFinalTournament')}
                        {...register('dateFinalTournament', validations['dateFinalTournament'](watch('dateStartTournament')))}
                    />
                </div>

                <PostLogged.TextArea
                    placeholder={outrasInformacoes}
                    {...register('otherInformation', validations['otherInformation'])}
                />

                <Button>{defaultValues ? alterar : adicionar}</Button>
            </form>
        </>
    );
}