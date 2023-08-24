
import styles from '../styles.module.css';
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { dataNascimento, dateBirthday, firstName, gender, lastName, nome, salvar, sobrenome } from 'constants/wordsPhrases';
import { RadioGroupGender } from 'components/RadioGroupGender/RadioGroupGender';


interface FormCreateProfileProps {
    submit: (data: any) => void
}


export function FormCreateProfile({ submit }: FormCreateProfileProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({});

    const validations = Validations.formCreateProfile;


    return (
        <div className={styles.formCreateProfile}>

            <div className={styles.uploadPhoto}>
                <img src={imgPhotoCircle} alt="" />
                <Button disabled>Carregar Foto</Button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <PreLoggedin.Input
                    placeholder={nome}
                    type='text'
                    {...register(firstName, validations[firstName])}
                    msgError={errors[firstName]?.message?.toString()}

                />

                <PreLoggedin.Input
                    placeholder={sobrenome}
                    type='text'
                    {...register(lastName, validations[lastName])}
                    msgError={errors[lastName]?.message?.toString()}

                />

                <label className={styles.date}>Data de Nascimento
                    <PreLoggedin.Input
                        placeholder={dataNascimento}
                        type='date'
                        {...register(dateBirthday, validations[dateBirthday])}
                        msgError={errors[dateBirthday]?.message?.toString()}
                    />
                </label>

                <RadioGroupGender
                    {...register(gender, validations[gender])}
                    msgError={errors[gender]?.message?.toString()}
                />
                
                <Button>{salvar}</Button>
            </form>
        </div>

    );
}