
import { ChangeEvent, useState } from 'react';
import styles from '../styles.module.css';
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { ValidationError } from 'yup';
import { dateBirthday, female, feminino, firstName, lastName, male, masculino, nome, salvar, sobrenome } from 'constants/wordsPhrases';


interface MainContentProps {
    submit: (data: any) => void
}


export function MainContent(props: MainContentProps) {

    const [gender, setGender] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formCreateProfile)
    });

   
    function submitForm(data: any){
        data.gender = gender;
        validateRadioButtonGender(gender, {func: props.submit, data: data});
    }


    function validateRadioButtonGender(str: string, opt?: { func?: any, data?: any}) {
        try {
            Validations.radioGroupGender.validateSync({ gender: str });
            // setErrorData("");
            if(opt){
                opt.func(opt.data);
            }
        } catch (error) {
            let c = error as ValidationError;
            // setErrorData(c.message);
        }
    }


    return (

        <main className={styles.containerMain}>

            <div className={styles.uploadPhoto}>
                <img src={imgPhotoCircle} alt="" />
                <Button disabled>Enviar</Button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <PreLoggedin.Input
                    placeholder={nome}
                    type='text'
                    name={firstName}
                    msgError={errors[firstName]?.message}
                    register={register}
                />

                <PreLoggedin.Input
                    placeholder={sobrenome}
                    type='text'
                    name={lastName}
                    msgError={errors[lastName]?.message}
                    register={register}
                />

                <div className={styles.date}>
                    <p>Data de Nascimento</p>
                    <PreLoggedin.Input
                        placeholder=''
                        type='date'
                        name={dateBirthday}
                        msgError={errors[dateBirthday]?.message}
                        register={register}
                    />

                </div>

                <div className={styles.gender}>
                    <p>Gênero</p>
                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id={male}
                            value='M'
                            checked={gender === 'M'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                        />
                        <label htmlFor={male}>{masculino}</label>
                    </div>
                    <div className={styles.radioButton}>
                        <input
                            type="radio"
                            id={female}
                            value='F'
                            checked={gender === 'F'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGender(e.target.value)}
                        />
                        <label htmlFor={female}>{feminino}</label>
                    </div>
                </div>
                <Button>{salvar}</Button>
            </form>
        </main>

    );
}