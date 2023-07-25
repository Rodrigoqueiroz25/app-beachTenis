
import styles from '../styles.module.css';
import imgCreatePasswd from 'assets/create_passwd.svg';
import { Button } from 'components/Button/Button';
import { PreLoggedin } from 'components/PreLoggedin';
import { Validations } from 'helper/Validations';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

interface MainContentProps {
    submit: (data: any) => void;
}


export function MainContent(props: MainContentProps) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(Validations.formCreatePasswd)
    });

    return (

        <main className={styles.containerMain}>
            <img className={styles.imgCreatePasswd} src={imgCreatePasswd} alt="" />
            <p className={styles.description}>Sua nova senha deve ser diferente de senhas usadas anteriormente.</p>
            <form className={styles.form} onSubmit={handleSubmit(props.submit)}>
                <PreLoggedin.Input 
                    placeholder='Nova Senha'
                    type='password'
                    name='passwd'
                    msgError={errors.passwd?.message}
                    register={register}
                />
                <PreLoggedin.Input 
                    placeholder='Repita a Nova Senha' 
                    type='password' 
                    name='repPasswd'
                    msgError={errors.repPasswd?.message}
                    register={register}
                />
                <Button>Salvar</Button>
            </form>
        </main>
    );
}