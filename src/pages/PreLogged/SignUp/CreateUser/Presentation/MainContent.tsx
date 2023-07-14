
import imgMail from '@/assets/Mail.svg';
import imgEye from '@/assets/eye.svg';
import styles from '../styles.module.css';

import { Button } from '@/components/Button/Button';
import { PreLoggedin } from '@/components/PreLoggedin';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Validations } from '@/helper/Validations';


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
                    placeholder="Telefone"
                    type='tel'
                    name='phoneNumber'
                    msgError={errors.phoneNumber?.message}
                    register={register}
                />
            </div>

            <PreLoggedin.Input
                placeholder='E-mail'
                type='email'
                name='email'
                src={imgMail}
                msgError={errors.email?.message}
                register={register}

            />
            <PreLoggedin.Input
                placeholder='Password'
                type='password'
                name='passwd'
                src={imgEye}
                msgError={errors.passwd?.message}
                register={register}

            />
            <PreLoggedin.Input
                placeholder='Repeat Password'
                type='password'
                name='repPasswd'
                src={imgEye}
                msgError={errors.repPasswd?.message}
                register={register}

            />

            <Button>Signup</Button>
        </form>
    );
}
