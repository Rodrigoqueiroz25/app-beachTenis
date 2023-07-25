
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
                placeholder='E-mail'
                type='text'
                name='email'
                msgError={errors.email?.message}
                src={imgMail}
                register={register}
            />
            <PreLoggedin.Input
                placeholder='Password'
                type='password'
                name='passwd'
                msgError={errors.passwd?.message}
                src={imgEye}
                register={register}
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
