
import styles from './styles.module.css';
import { PostLogged } from 'components/PostLogged';
import { Button } from 'components/Button/Button';
import { useForm } from 'react-hook-form';
import { ICategory } from 'interfaces/ICategory';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';


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
            setValue("description", defaultValues.description);
            setValue("numberAthletes", defaultValues.numberAthletes);
            setValue("numberAthletesRegistration", defaultValues.numberAthletesRegistration);
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
                placeholder='Descrição'
                msgError={errors.description?.message}
                {...register("description")}
            />

            <PostLogged.Combobox
                placeholder='Quantidade de pessoas por inscrição'
                msgError={errors.numberAthletesRegistration?.message}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                isEmpty={watch("numberAthletesRegistration") ? false : true }
                {...register("numberAthletesRegistration")}
            />

            <PostLogged.Input
                type='number'
                placeholder='Quantidade máxima de inscritos'
                msgError={errors.numberAthletes?.message}
                {...register("numberAthletes")}
            />
            <div className={styles.btn}>
                <Button>{defaultValues ? "Alterar" : "Adicionar"}</Button>
            </div>
        </form>
    );
}