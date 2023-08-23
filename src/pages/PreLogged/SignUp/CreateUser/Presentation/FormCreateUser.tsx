
import imgMail from 'assets/Mail.svg';
import imgEye from 'assets/eye.svg';
import styles from '../styles.module.css';

import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validations } from 'helper/Validations';
import { e_mail, email, password, phoneNumber, repeatPasswd, repitaSenha, senha, telefone } from 'constants/wordsPhrases';


interface MainContentProps {
    submit: (data: any) => void
}


export function FormCreateUser(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formCreateUser)
    });


    return (
        <form className={styles.form} onSubmit={handleSubmit(props.submit)}>

            <PreLoggedin.InputMasked
                mask='+55(99)99999-9999'
                placeholder={telefone}
                type='tel'
                {...register(phoneNumber)}
                msgError={errors[phoneNumber]?.message}
            />

            <PreLoggedin.Input
                placeholder={e_mail}
                type='text'
                src={imgMail}
                {...register(email)}
                msgError={errors[email]?.message}
            />

            <PreLoggedin.Input
                placeholder={senha}
                type='password'
                src={imgEye}
                {...register(password)}
                msgError={errors[password]?.message}
            />

            <PreLoggedin.Input
                placeholder={repitaSenha}
                type='password'
                src={imgEye}
                {...register(repeatPasswd)}
                msgError={errors[repeatPasswd]?.message}

            />

            <Button>Cadastrar-se</Button>
        </form>
    );
}
