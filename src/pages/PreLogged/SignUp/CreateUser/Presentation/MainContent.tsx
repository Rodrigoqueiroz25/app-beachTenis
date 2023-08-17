
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


export function MainContent(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formCreateUser)
    });


    return (

        <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
            <div className={styles.inputPhoneNumber}>
                <p className={styles.codexCountry}>+55</p>
                <PreLoggedin.InputMasked
                    mask='(99)99999-9999'
                    placeholder={telefone}
                    type='tel'
                    name={phoneNumber}
                    msgError={errors[phoneNumber]?.message}
                    register={register}
                />
            </div>

            <PreLoggedin.Input
                placeholder={e_mail}
                type='email'
                name={email}
                src={imgMail}
                msgError={errors[email]?.message}
                register={register}

            />
            <PreLoggedin.Input
                placeholder={senha}
                type='password'
                name={password}
                src={imgEye}
                msgError={errors[password]?.message}
                register={register}

            />
            <PreLoggedin.Input
                placeholder={repitaSenha}
                type='password'
                name={repeatPasswd}
                src={imgEye}
                msgError={errors[repeatPasswd]?.message}
                register={register}

            />

            <Button>Signup</Button>
        </form>
    );
}
