
import styles from './styles.module.css';
import { PostLogged } from '@/components/PostLogged';
import { Button } from '@/components/Button/Button';
import { useForm } from 'react-hook-form';
import { ICategory } from '@/interfaces/ICategory';
import { Validations } from '@/helper/Validations';
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
                label='Descrição'
                name='description'
                type='text'
                placeholder='Descrição'
                register={register}
                msgError={errors.description?.message}
            />

            <PostLogged.Combobox
                label='Quantidade de pessoas por inscrição'
                name='numberAthletesRegistration'
                register={register}
                msgError={errors.numberAthletesRegistration?.message}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                isEmpty={watch("numberAthletesRegistration") ? false : true }
            />

            <PostLogged.Input
                label='Quantidade máxima de inscritos'
                name='numberAthletes'
                type='number'
                placeholder='Quantidade máxima de inscritos'
                register={register}
                msgError={errors.numberAthletes?.message}
            />
            <div className={styles.btn}>
                <Button>{defaultValues ? "Alterar" : "Adicionar"}</Button>
            </div>
        </form>
    );
}