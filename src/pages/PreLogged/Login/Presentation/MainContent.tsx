
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


interface MainContentProps {
    submit: (data: any) => void;
    isAuth: boolean;
    error: string;
}

export function MainContent(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formLogin)
    });

    return (

        <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
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
                <Link className={styles.link} to={Routes.forgotPasswd}>Forgot Password?</Link>
            </div>
        
            {!props.isAuth &&
                <div className={styles.msgErroLogin}>
                    <p>{props.error}</p>
                </div>
            }

            <Button>Login</Button>
        </form>

    );
}
