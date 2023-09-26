
import { Link } from 'react-router-dom';
import styles from '../styles.module.css';
import imgMail from 'assets/Mail.svg';
import imgEye from 'assets/eye.svg';
import { Button } from 'components/Button/Button';
import { Routes } from 'enums/routes.enum';
import { PreLoggedin } from 'components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { e_mail, email, password, senha } from 'constants/wordsPhrases';


interface FormLoginProps {
    submit: (data: any) => void;
    error: string;
}

export function FormLogin({ submit, error }: FormLoginProps) {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formLogin)
    });


    return (
        <div className={styles.formLogin}>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
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

                <div className={styles.forgotPasswd}>
                    <Link className={styles.link} to={Routes.forgotPasswd}>Esqueceu a Senha?</Link>
                </div>

                {error &&
                    <div className={styles.msgErroLogin}>
                        <p>{error}</p>
                    </div>
                }

                <Button>Login</Button>
            </form>
        </div>
    );
}
