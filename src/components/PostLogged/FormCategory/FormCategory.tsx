/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { Button } from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { adicionar, alterar, descricao, qtdMaxInscritos, qtdPessoasPorInscricao } from 'constants/wordsPhrases';
import { FieldsCategory } from 'models/Category';


interface FormCategoryProps {
    submit: (data: FieldsCategory) => void;
    defaultValues?: FieldsCategory;
}


export function FormCategory({submit, defaultValues}: FormCategoryProps) {

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FieldsCategory>({
        resolver: yupResolver(Validations.formCategories)
    });
    

    useEffect(() =>{
        if(defaultValues){
            setValue('description', defaultValues['description']);
            setValue('numberMaxAthletes', defaultValues['numberMaxAthletes']);
            setValue('numberAthletesPerRegistration', defaultValues['numberAthletesPerRegistration']);
        }
    }, [defaultValues]);


    function submitForm(data: FieldsCategory){
        reset();
        submit(data);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <PostLogged.Input
                type='text'
                placeholder={descricao}
                msgError={errors['description']?.message}
                {...register('description')}
            />

            <PostLogged.Combobox
                placeholder={qtdPessoasPorInscricao}
                msgError={errors['numberAthletesPerRegistration']?.message}
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((opt) => (
                    {name: opt, value: Number(opt)}                    
                ))}
                {...register('numberAthletesPerRegistration')}
            />

            <PostLogged.Input
                type='number'
                placeholder={qtdMaxInscritos}
                msgError={errors['numberMaxAthletes']?.message}
                {...register('numberMaxAthletes')}
            />
            <div className={styles.btn}>
                <Button>{defaultValues ? alterar : adicionar}</Button>
            </div>
        </form>
    );
}