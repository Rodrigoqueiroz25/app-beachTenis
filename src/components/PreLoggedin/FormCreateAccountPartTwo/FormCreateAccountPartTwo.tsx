
import styles from './styles.module.css';
import imgPhotoCircle from 'assets/photo_create_profile.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { dataNascimento, nome, salvar, sobrenome } from 'constants/wordsPhrases';
import { RadioGroupGender } from 'components/RadioGroupGender/RadioGroupGender';
import { FieldsCreateUserAccountPart2 } from 'models/UserAccount';


interface Props {
    submit: (data: any) => void
}

const INPUTS = [
    { component: PreLoggedin.Input, label: '', placeholder: nome, type: 'text', name: 'firstName' as 'firstName' },
    { component: PreLoggedin.Input, label: '', placeholder: sobrenome, type: 'text', name: 'lastName' as 'lastName' },
    { component: PreLoggedin.Input, label: 'Data de Nascimento', placeholder: dataNascimento, type: 'date', name: 'dateBirthday' as 'dateBirthday' },
    { component: RadioGroupGender, label: '', placeholder: '', type: 'radio', name: 'gender' as 'gender' },
]


export function FormCreateAccountPartTwo({ submit }: Props) {

    const { register, handleSubmit, formState: { errors } } = useForm<FieldsCreateUserAccountPart2>();
    const validations = Validations.formCreateAccountPartTwo;

    return (
        <div className={styles.formCreateProfile}>

            <div className={styles.uploadPhoto}>
                <img src={imgPhotoCircle} alt="" />
                <Button disabled>Carregar Foto</Button>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                {INPUTS.map((input, key) => (
                    <input.component
                        label={input.label}
                        key={key}
                        placeholder={input.placeholder}
                        type={input.type}
                        msgError={errors[input.name]?.message?.toString()}
                        {...register(input.name, validations[input.name])}
                    />
                ))}
                <Button>{salvar}</Button>
            </form>
        </div>

    );
}