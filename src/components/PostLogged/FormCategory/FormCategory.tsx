/* eslint-disable react-hooks/exhaustive-deps */

import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { Button } from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { ICategory } from 'interfaces/ICategory';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { adicionar, alterar, descricao, description, maxNumberAthletesCategory, numberAthletesPerRegistration, qtdMaxInscritos, qtdPessoasPorInscricao } from 'constants/wordsPhrases';


interface FormCategoryProps {
    submit: (dataForm: any) => void;
    defaultValues?: ICategory;
}


export function FormCategory({submit, defaultValues}: FormCategoryProps) {

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm({
        resolver: yupResolver(Validations.formCategories)
    });
    

    useEffect(() =>{
        if(defaultValues){
            setValue(description, defaultValues[description]);
            setValue(maxNumberAthletesCategory, defaultValues[maxNumberAthletesCategory]);
            setValue(numberAthletesPerRegistration, defaultValues[numberAthletesPerRegistration]);
        }
    }, [defaultValues]);


    function submitForm(data: any){
        reset();
        submit(data);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <PostLogged.Input
                type='text'
                placeholder={descricao}
                msgError={errors[description]?.message}
                {...register(description)}
            />

            <PostLogged.Combobox
                placeholder={qtdPessoasPorInscricao}
                msgError={errors[numberAthletesPerRegistration]?.message}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                isEmpty={watch(numberAthletesPerRegistration) ? false : true }
                {...register(numberAthletesPerRegistration)}
            />

            <PostLogged.Input
                type='number'
                placeholder={qtdMaxInscritos}
                msgError={errors[maxNumberAthletesCategory]?.message}
                {...register(maxNumberAthletesCategory)}
            />
            <div className={styles.btn}>
                <Button>{defaultValues ? alterar : adicionar}</Button>
            </div>
        </form>
    );
}