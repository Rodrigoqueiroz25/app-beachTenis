
import styles from '../styles.module.css'
import imgForgotPasswd from 'assets/forgot_password.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { e_mail, email } from 'constants/wordsPhrases';

interface MainContentProps {
    submit: (data: any) => void;
}

export function MainContent(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formForgotPasswd)
    });


    return (

        <main className={styles.containerMain}>
            <img className={styles.imgForgotPasswd} src={imgForgotPasswd} alt="" />
            <p className={styles.textForgotPasswd}>Digite seu endereço de e-mail registrado abaixo para receber instruções de redefinição de senha</p>
            <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
                <PreLoggedin.Input 
                    placeholder={e_mail}
                    type='text'
                    {...register(email)}
                    msgError={errors[email]?.message}
                />
                <div>
                    <p className={styles.txtRememberPasswd}>
                        Lembrou-se da Senha?
                        <Link className={styles.linkToLoginScreen} to='/login'>Log in</Link>
                    </p>
                </div>
                <Button>Enviar</Button>
            </form>
        </main>

    );
}